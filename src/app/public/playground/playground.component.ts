import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StoryService } from 'src/app/services/story.service';
import { WalletService } from 'src/app/services/wallet.service';

interface Item extends DocumentData {
  id?: string,
  test?: string,
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  @ViewChild("canvasAfter") canvasAfter: ElementRef;


  subs: Subscription[] = [];

  stories: any[] = [];

  isConnected: boolean = false;
  item$: Observable<Item[]>;
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private storyService: StoryService,
    private wallet: WalletService
  ) {
    const col = collection(this.firestore, 'items');
    this.item$ = collectionData(col);
  }

  get storiesBefore() {
    return this.stories.slice(0, 2);
  }

  get storiesAfter() {
    return this.stories.slice(this.stories.length-2);
  }

  connect() {
    this.auth.connectToMetaMask();
  }

  scrollDown() {
    setTimeout(() => {
      this.canvasAfter.nativeElement.scrollTo(0,document.body.scrollHeight);
    }, 100);
  }

  ngOnInit(): void {
    this.subs.push(this.item$.subscribe(data => {
      console.log(data);
    }));

    this.subs.push(this.auth.onAccountChange$.subscribe(account => {
      this.isConnected = !!account;
    }));

    this.stories = this.storyService.stories.map(s => {
      s.address = this.wallet.shortAddress(s.address);
      return s;
    });
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      });
  }

}
