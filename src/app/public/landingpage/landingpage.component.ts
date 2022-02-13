import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe()
    });
  }

  navigate(path: string, pub = false, scroll = true) {
    if (scroll) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    this.router.navigate([`${pub ? ('/p') : ''}/${path}`]);
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
