import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  title = 'ng crm';
  user: any = null;
  isMobile: boolean;
  mode = "side"
  uiContent = "content"
  progrssBarClass = "progress-bar";
  isloading = true;
  userName: string;
  dealerName: string;

  constructor(
    // private loadingBar: SlimLoadingBarService,
    private router: Router,
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) {
    console.log(" constructor")

    this.isloading = true;

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      console.log(result)
      if (result.matches) {
        // this.activateHandsetLayout();
        this.isMobile = true;
        this.mode = "over"
        this.uiContent = "mobile-content"
      }
      else {
        this.isMobile = false;
        this.mode = "side"
        this.uiContent = "content"
      }
    });
    // breakpointObserver.ngOnDestroy()

    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    })
      ;
  }

  ngOnChanges() {
    console.log(" ngOnChanges")
  }


  ngOnInit(): void {
    console.log(" ngOnInit")
    this.user = this.authService.getUser();
    this.isloading = false;
  }

  logout(): void {
    // localStorage.removeItem('currentUser');
    this.authService.logout()
    this.router.navigate(['login']);
  }



  isAuth(isAuth?: any) {
    if (isAuth) {
      this.user = this.authService.getUser()
      // this.user = JSON.parse(localStorage.getItem(APP_USER_PROFILE)) || <User>{};
    }
    if (this.user.email === 'johndlr') {
      localStorage.setItem("userName", "Reynolds, Dave");
      localStorage.setItem("userId","F294EFFF3E516F43AD5372F5353A9C5A")
      localStorage.setItem("dealerName", "Southfield Avis Ford (QL8RT)");
      localStorage.setItem("dealerId", "QL8RT");
    } else {
      localStorage.setItem("userName", "Boyer, John");
      localStorage.setItem("dealerName", "Tamaroff Honda (YB9MC)");
      localStorage.setItem("dealerId", "YB9MC");
      localStorage.setItem("userId","028163410C432D419F71C5D8650277CF");
    }
    this.userName =localStorage.getItem("userName");
    this.dealerName =localStorage.getItem("dealerName");
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this. progrssBarClass = "progress-bar";
      this.isloading = true;
    }
    if (event instanceof NavigationEnd) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationCancel) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationError) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }

  }


  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy()
    this.authService.logout()
    //   this.router.events
    // this.breakpoint.
  }

}
