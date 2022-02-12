import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class PlaygroundComponent implements OnInit, OnDestroy {
  @ViewChild("canvasAfter") canvasAfter: ElementRef;

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
    private alert: AlertService
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

  get countdown() {
    return `${this.count.hour} hours ${this.count.minute} minutes ${this.count.second} seconds`;
  }

  get storiesReverse() {
    const s = [...this.stories];
    return s.reverse();
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

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  closeCanvas(el: HTMLButtonElement) {
    el.click();
  }

}
