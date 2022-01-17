import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  isDark: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: any) {
    if(window.pageYOffset > 50) {
      this.isDark = true;
      return;
    }

    this.isDark = false;
  }

  scrollTo(el: HTMLElement) {
    el.scrollIntoView();
  }
}
