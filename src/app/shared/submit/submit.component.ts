import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CountdownService } from 'src/app/services/countdown.service';
import { Submission, SubmissionService } from 'src/app/services/data/submission.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit, OnDestroy {
  @Input() title: string = "";
  @Input() day: number;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  subs: Subscription[] = [];

  _text: string = "";
  set text(t: string) {
    this._text = t;
  }

  get text() {
    return this._text;
  }

  constructor(
    private submissionService: SubmissionService,
    private wallet: WalletService,
    private alert: AlertService,
    private count: CountdownService,
    private router: Router
  ) { }

  get isSubmission() {
    return this.count.isSubmission;
  }

  get isVoting() {
    return this.count.isVoting;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  goToVote() {
    this.onSubmit.emit()
    setTimeout(() => {
      this.router.navigate(["/p/vote"]);
    }, 300);
  }

  submit() {
    if (!((this.day || this.day === 0) && this.wallet.connectedAccount && this._text)) {
      return;
    }

    if (this._text.length < 32) {
      this.alert.error("Your story is too short to qualify. Min 32 characters!");
      return;
    }

    const submission: Submission = {
      text: this._text,
      day: this.day,
      address: this.wallet.connectedAccount
    }

    this.wallet.sign(this._text).then(_ => {
      this.submissionService.create(submission).then(_ => {
        this._text = "";
        this.alert.success("Your submission was successful!");
        this.onSubmit.emit();
      }).catch(_ => {
        this.alert.error("Your submission was  not successful!");
      });
    }).catch(_ => {
    });
  }
}
