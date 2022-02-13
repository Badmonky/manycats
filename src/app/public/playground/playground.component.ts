import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CountdownService } from 'src/app/services/countdown.service';
import { ConfigService } from 'src/app/services/data/config.service';
import { Story, StoryService } from 'src/app/services/data/story.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("canvasAfter") canvasAfter: ElementRef;
  @ViewChild("container1") container1: ElementRef;
  @ViewChild("container2") container2: ElementRef;
  @ViewChild("header1") header1: ElementRef;
  @ViewChild("header2") header2: ElementRef;
  @ViewChild("small1") small1: ElementRef;
  @ViewChild("small2") small2: ElementRef;

  maxDay: number = 0;

  subs: Subscription[] = [];
  stories: any[] = [];

  constructor(
    private config: ConfigService,
    private auth: AuthService,
    private storyService: StoryService,
    private wallet: WalletService,
    private count: CountdownService,
    private router: Router,
    private alert: AlertService,
    private cdref: ChangeDetectorRef
  ) { }

  get isPrepare() {
    return this.count.isPrepare;
  }

  _redirect: boolean = false
  get canSubmit() {
    if (!this._redirect && this.count.isVoting) {
      this._redirect = true;
      setTimeout(() => {
        this.goToVote();
      }, 500);
    }

    return this.count.isSubmission;
  }

  _height1 = 0;
  get height1() {
    return this._height1;
  }

  _height2 = 0;
  get height2() {
    return this._height2;
  }

  get countdown() {
    return `${this.count.hour} hours ${this.count.minute} minutes ${this.count.second} seconds`;
  }

  get storiesReverse() {
    const s = [...this.stories];
    return s.reverse();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(!(this.container1 && this.container2
    && this.header1 && this.header2
    && this.small1 && this.small2)) {
      return;
    }

    this._height1 = this.container1.nativeElement.offsetHeight - this.header1.nativeElement.offsetHeight - this.small1.nativeElement.offsetHeight -45;
    this._height2 = this.container2.nativeElement.offsetHeight - this.header2.nativeElement.offsetHeight - this.small2.nativeElement.offsetHeight -60;
    
    this.cdref.detectChanges()
  }

  connect() {
    this.auth.connectToMetaMask();
  }

  goToVote() {
    if (!this.count.isVoting) {
      this.alert.warning("Voting is currently disabled!");
      return;
    }
    this.router.navigate(["/p/vote"]);
  }

  scrollDown() {
    setTimeout(() => {
      this.canvasAfter.nativeElement.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  ngOnInit(): void {
    if (this.count.isVoting) {
      this.goToVote();
      return;
    }

    this.config.maxDay$.pipe(
      take(1)
    ).subscribe(day => {
      this.maxDay = day;

      this.storyService.all().subscribe((stories: Story[]) => {
        this.stories = [];
        stories.forEach(s => {
          s.address = this.wallet.shortAddress(s.address);
          this.stories.push(s);
        });

        this.stories = this.stories.sort((a, b) => {
          if (a.day === b.day) {
            return 0;
          }

          return a.day > b.day ? 1 : -1;
        })
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize(null);
    }, 500);
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
