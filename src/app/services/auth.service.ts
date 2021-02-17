import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';

// Model
import { AuthData } from '../models/auth-data.model';
import { Login } from '../models/login.model';

// Sanck Bar
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStateListener = new Subject<boolean>();
  private userId: string;
  private user = new Subject<AuthData>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    ) { }

  getToken() {
    return this.token;
  }

  getAuthStateListener() {
    return this.authStateListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUser() {
    return this.user.asObservable();
  }


  createUser(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const authData: AuthData = { firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, password: password};
    this.http.post('http://localhost:1205/api/user/signup', authData).subscribe((response) => {
      console.log(response);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: 'Account Created Successfully',
        },
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000
      });
    });
  }

  login(email: string, password: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const authData: Login = { email: email, password: password };
    this.http.post<{token: string, expiresIn: number, userId: string}>('https://insight-skills-admin.herokuapp.com/api/user/login', authData)
    .subscribe(response => {
      console.log(response);
      console.log(response.userId);
      const token = response.token;
      this.token = token;

      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: 'Login Successfully',
        },
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000
      });

      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStateListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000 );
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        this.getUserProfile();
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStateListener.next(true);
      this.getUserProfile();
    }
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStateListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.user.next(null);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: 'Login Out Successfully',
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });

    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      user: user
    };
  }

  getUserProfile() {
    // console.log(localStorage.getItem('userId'));
    const userId = this.getUserId();
    this.http.get<{message: string, user: AuthData}>(`http://localhost:1205/api/user/${userId}`).subscribe((response) => {
      console.log(response.user);
      this.user.next(response.user);
    });
  }
}
