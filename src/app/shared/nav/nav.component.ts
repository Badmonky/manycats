import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ConfigService } from 'src/app/services/data/config.service';
import { WalletService } from 'src/app/services/wallet.service';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("header", { static: true }) header: ElementRef;
  @Output() getHeight: EventEmitter<number> = new EventEmitter();

  isDark: boolean = false;
  isConnected: boolean = false;

  account: string | null = null;

  maxDay: number;

  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private wallet: WalletService,
    private cdref: ChangeDetectorRef,
    private config: ConfigService
  ) { }

  get small() {
    return window.innerWidth < 752;
  }

  ngOnInit(): void {
    this.config.maxDay$.subscribe(day => {
      this.maxDay = day;
    });

    this.subs.push(
      this.wallet.onConnect$.subscribe(isConnected => {
        this.isConnected = isConnected;
      })
    );

    this.subs.push(
      this.wallet.onAccount$.subscribe((account: string | null) => {
        if (!account) {
          this.account = null;
          return;
        }
        this.account = this.wallet.shortAddress(account);
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
    if (window.pageYOffset > 50) {
      this.isDark = true;
      return;
    }

    this.isDark = false;
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

  handleConnect() {
    if (this.isConnected) {
      this.wallet.disconnect();
      return;
    }

    this.wallet.connect();
  }

  closeMenu(el: HTMLButtonElement) {
    const isVisible = $("#hamburger").is(":visible");
    if(!isVisible) {
      return;
    }
    el.click();
  }
}
