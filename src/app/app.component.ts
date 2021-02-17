import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'admin-dashboard';
  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(private mediaObserver: MediaObserver, private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
    this.mediaSub = this.mediaObserver.asObservable()
    .pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
