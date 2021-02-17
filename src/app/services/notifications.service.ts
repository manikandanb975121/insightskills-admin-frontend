import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notification = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  postNotifications(title, content, date, links) {
    const data = {
      // tslint:disable-next-line: object-literal-shorthand
      title: title, content: content, createdDate: date, links: links
    };
    console.log(data);
    this.http.post('http://localhost:1205/api/notification', data).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/notificationList', { skipLocationChange: true }).then(() => {
        this.router.navigate(['upload']);
      });
    });
  }

  getNotifications() {
    this.http.get<{ messag: string, result: any}>('http://localhost:1205/api/notification').subscribe(response => {
      this.notification.next(response.result);
    });
  }

  getUpdatedNotification() {
    return this.notification.asObservable();
  }

  deleteNotification(id) {
    this.http.delete(`http://localhost:1205/api/notification/${id}`).subscribe(response => {
      console.log(response);
    });
  }
}
