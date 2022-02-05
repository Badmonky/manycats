import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Story, StoryService } from 'src/app/services/data/story.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  @ViewChild("canvasAfter") canvasAfter: ElementRef;

  minDay: number = 0;
  maxDay: number = 0;

  subs: Subscription[] = [];
  stories: any[] = [];

  constructor(
    private auth: AuthService,
    private storyService: StoryService,
    private wallet: WalletService
  ) { }

  get storiesReverse() {
    return this.stories.reverse();
  }

  connect() {
    this.auth.connectToMetaMask();
  }

  scrollDown() {
    setTimeout(() => {
      this.canvasAfter.nativeElement.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  ngOnInit(): void {
    this.stories = this.storyService.stories.map((s: Story) => {
      s.address = this.wallet.shortAddress(s.address);

      if (this.minDay > s.day) {
        this.minDay = s.day;
      }

      if (this.maxDay < s.day) {
        this.maxDay = s.day;
      }
      return s;
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  closeCanvas(el: HTMLButtonElement) {
    el.click();
  }

}
