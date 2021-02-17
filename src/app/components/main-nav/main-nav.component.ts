import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  user: any;
  deviceXs: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaObserver: MediaObserver,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });

    // this.authListenerSubs = this.authService.getAuthStateListener()
    // .subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;
    // });
    this.mediaSub = this.mediaObserver.asObservable()
    .pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStateListener().subscribe(isAutheticated => {
        this.userIsAuthenticated = isAutheticated;
        this.authService.getUser().subscribe(user => {
          // console.log(user);
          this.user = user;
        });
      });
  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
  isAuthenticated() {
    return this.userIsAuthenticated;
  }
}
