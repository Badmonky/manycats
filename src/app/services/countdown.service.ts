import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  isVoting: boolean = false;
  isSubmission: boolean = false;

  get isPrepare() {
    return !(this.isVoting || this.isSubmission)
  }

  set switchInSeconds(t: number) {
    const h = Math.floor((t / 60 / 60) % (this._runtime_hours / 2));
    const m = Math.floor((t / 60) % 60);
    const s = Math.floor(t % 60);

    this.hour = (h < 10 ? "0" : "") + h;
    this.minute = (m < 10 ? "0" : "") + m;
    this.second = (s < 10 ? "0" : "") + s;
  }

  hour: string = "00";
  minute: string = "00";
  second: string = "00";

  _runtime_hours: number = 0;
  _start: moment.Moment;

  constructor() {
  }

  init(date: moment.Moment, runtime: number) {
    if (this._start !== undefined) {
      return;
    }

    this._runtime_hours = runtime;
    this._start = date;

    this._calc();
    setInterval(this._calc.bind(this), 1000);
  }

  _calc() {
    //@ts-ignore
    const ts = this.date - this._start;
    const time = (ts / 1000 / 60 / 60) % this._runtime_hours

    this.switchInSeconds = (86400 / 24) * (this._runtime_hours / 2) - (((ts / 1000 / 60 / 60) % (this._runtime_hours / 2)) * 60 * 60);

    const isSubmissionPeriod = time <= (this._runtime_hours / 2);
    this.isSubmission = isSubmissionPeriod;
    this.isVoting = !isSubmissionPeriod;
  }

  get date() {
    return moment.utc();
  }
}
