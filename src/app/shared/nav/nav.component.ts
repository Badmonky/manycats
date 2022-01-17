import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isDark: boolean = false;

  constructor(
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void { }

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: any) {
    if(window.pageYOffset > 50) {
      this.isDark = true;
      return;
    }

    this.isDark = false;
  }

  scrollTo(link: string) {
    this.scrollService.scrollTo(link);
  }
}
