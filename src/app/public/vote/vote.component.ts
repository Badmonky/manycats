import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Submission, SubmissionService } from 'src/app/services/data/submission.service';
import { Vote, VoteService } from 'src/app/services/data/vote.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  storyVotes: any = {};
  myVotes: any = {};

  past: Submission[] = [];
  future: Submission[] = [];

  constructor(
    private wallet: WalletService,
    private submissionService: SubmissionService,
    private votingService: VoteService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    if (!this.wallet.connectedAccount) {
      return;
    }

    this.submissionService.all([
      ["day", "in", [13, -13]]
    ]).subscribe((submissions: Submission[]) => {
      const subIds: string[] = [];
      submissions.forEach(d => {
        if (!d.id) {
          return;
        }

        subIds.push(d.id);
        d.address = this.wallet.shortAddress(d.address);

        if (d.day < 0) {
          this.past.push(d);
        } else if (d.day > 0) {
          this.future.push(d);
        }
      });

      if (subIds.length === 0) {
        return;
      }

      this.votingService.all([
        ["submission_id", "in", subIds]
      ]).subscribe((votes: Vote[]) => {
        this.storyVotes = {};
        this.myVotes = {};

        votes.forEach(v => {
          if (v.address === this.wallet.connectedAccount) {
            this.myVotes[v.type] = v;
          }

          if (!this.storyVotes[v.submission_id]) {
            this.storyVotes[v.submission_id] = 0;
          }

          this.storyVotes[v.submission_id] += v.weight;
        });

        this.past = this._sort(this.past);
        this.future = this._sort(this.future);
      });
    });
  }

  _sort(s: any[]) {
    return s.sort((a, b) => {
      if (this.storyVotes[a.id] === this.storyVotes[b.id]) {
        return a.created_at - b.created_at;
      }
      return (this.storyVotes[a.id] || 0) > (this.storyVotes[b.id] || 0) ? -1 : 1;
    });
  }

  vote(s: Submission, type: string) {
    if (!(s.id && this.wallet.connectedAccount)) {
      return;
    }

    const currentVote: Vote = this.myVotes[type];
    if (currentVote && currentVote.submission_id === s.id) {
      this.alert.error("You have already voted for this option");
      return;
    }

    const myVote: Vote = {
      submission_id: s.id,
      address: this.wallet.connectedAccount,
      weight: 1,
      type
    }

    this.wallet.sign(`VOTE FOR - ${s.text}`).then(_ => {
      let p: Promise<any> = Promise.resolve();
      let change = true;
      if (!currentVote) {
        change = false;
        p = this.votingService.create(myVote);
      } else {
        myVote.id = currentVote.id;
        p = this.votingService.update(myVote);
      }

      p.then(_ => {
        this.alert.success(change ? "You changed your vote successfully!" : "Your vote was successful!");
      }).catch(err => {
        this.alert.error("Your vote was not successful!");
      });
    }).catch(_ => {
      console.log("NOT cool :(");
    });
  }

}
