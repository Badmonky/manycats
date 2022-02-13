import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: any[] = [];

  constructor(
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.alert.alerts$.subscribe(alerts => {
      const a = [...alerts];
      a.reverse();

      this.alerts = a;
    });
  }

}
