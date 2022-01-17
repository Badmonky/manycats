import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild("about", {static: true}) about: ElementRef<any>

  subs: Subscription[] = [];

  constructor(
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe()
    });
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.subs.push(
        this.scrollService.onScroll$.subscribe(key => {
          switch(key) {
            case "about":
              this.about.nativeElement.scrollIntoView();
              return;
          }
        })
      );
    }, 200);
  }
}
