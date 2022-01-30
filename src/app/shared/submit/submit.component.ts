import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {
  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
