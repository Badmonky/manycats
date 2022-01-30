import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("header", {static: true}) header: ElementRef;
  @Output() getHeight: EventEmitter<number> = new EventEmitter();

  isDark: boolean = false;
  isConnected: boolean = false;

  account: string | null = null;

  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private wallet: WalletService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.wallet.onConnect$.subscribe(isConnected => {
        this.isConnected = isConnected;
      })
    );

    this.subs.push(
      this.wallet.onAccount$.subscribe((account: string | null) => {
        if(!account) {
          this.account = null;
          return;
        }
        this.account = account;
        this.cdref.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    const height = this.header?.nativeElement?.offsetHeight || 0;
    this.getHeight.emit(height);
  }

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: any) {
    if(window.pageYOffset > 50) {
      this.isDark = true;
      return;
    }

    this.isDark = false;
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

  handleConnect() {
    if(this.isConnected) {
      this.wallet.disconnect();
      return;
    }

    this.wallet.connect();
  }
}
