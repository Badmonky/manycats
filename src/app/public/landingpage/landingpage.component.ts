import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit, OnDestroy {
  @ViewChild("home", {static: true}) home: ElementRef<any>;
  @ViewChild("about", {static: true}) about: ElementRef<any>

  subs: Subscription[] = [];

  elementMap: any = {};

  constructor(
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.elementMap = {
      home: this.home.nativeElement,
      about: this.about.nativeElement
    }

    this.subs.push(
      this.scrollService.onScroll$.subscribe(key => {
        const el: HTMLElement = this.elementMap[key];
        if(el) {
          el.scrollIntoView()
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe()
    });
  }
}
