import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isDark: boolean = false;

  constructor(
    private router: Router,
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

  navigate(path: string, pub=false, scroll=true) {
    if(scroll) {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
    
    this.router.navigate([`${pub ? ('/p') : ''}/${path}`]);
  }
}
