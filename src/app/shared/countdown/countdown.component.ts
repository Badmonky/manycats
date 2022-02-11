import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountdownService } from 'src/app/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, AfterViewInit {
  @ViewChild("span", { static: true }) span: ElementRef;
  @ViewChild("c1") c1: ElementRef;
  @ViewChild("c2") c2: ElementRef;
  @ViewChild("c3") c3: ElementRef;
  @ViewChild("c4") c4: ElementRef;
  @ViewChild("c5") c5: ElementRef;

  _maxWidth: number = 100000;
  set maxWidth(mw: number) {
    if (this._maxWidth === mw) {
      return;
    }
    this._maxWidth = mw;
    this.cdref.detectChanges();
  }
  get maxWidth() {
    return this._maxWidth;
  }

  _containerWidth: number = 100000;
  set containerWidth(cw: number) {
    if (this._containerWidth === cw) {
      return;
    }
    this._containerWidth = cw;
    this.cdref.detectChanges();
  }
  get containerWidth() {
    return this._containerWidth;
  }

  constructor(
    private count: CountdownService,
    private cdref: ChangeDetectorRef
  ) { }

  get show() {
    return !this.count.isPrepare;
  }

  ngAfterViewInit(): void {
    this._calcWidth();
  }

  _calcWidth() {
    this.maxWidth = 10000;
    this.containerWidth = 10000;

    setTimeout(() => {
      this.maxWidth = this.span.nativeElement.offsetWidth + 1;

      this.containerWidth = this.c1.nativeElement.offsetWidth
        + this.c2.nativeElement.offsetWidth
        + this.c3.nativeElement.offsetWidth
        + this.c4.nativeElement.offsetWidth
        + this.c5.nativeElement.offsetWidth + 30;

      this.cdref.detectChanges();
    }, 100);
  }

  _period: string = "";
  get period() {
    const period = this.count.isVoting ? "Voting" : this.count.isSubmission ? "Submission" : "Preparation";
    if (this._period !== period) {
      this._calcWidth();
    }

    this._period = period;
    return this._period;
  }

  get hour() {
    return this.count.hour;
  }

  get min() {
    return this.count.minute
  }

  get sec() {
    return this.count.second;
  }

  ngOnInit(): void {
    console.log("Date = ", this.count.date);
  }

}
