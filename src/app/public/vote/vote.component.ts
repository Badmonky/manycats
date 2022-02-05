import { Component, OnInit } from '@angular/core';
import { Submission, SubmissionService } from 'src/app/services/data/submission.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  past: Submission[] = [];
  future: Submission[] = [];

  constructor(
    private wallet: WalletService,
    private submissionService: SubmissionService
  ) { }

  ngOnInit(): void {
    this.submissionService.all([
      ["day", "in", [13, -13]]
    ]).subscribe((data: Submission[]) => {
      data.forEach(d => {
        d.address = this.wallet.shortAddress(d.address);

        if (d.day < 0) {
          this.past.push(d);
        } else if (d.day > 0) {
          this.future.push(d);
        }
      });
    });
  }

}
