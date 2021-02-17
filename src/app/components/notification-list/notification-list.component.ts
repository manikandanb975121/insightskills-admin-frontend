import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications: any;
  constructor(
    private notificationService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notificationService.getNotifications();
    this.notificationService.getUpdatedNotification().subscribe(data => {
      console.log(data);
      this.notifications = data;
    });
  }

  openLink(link) {
    window.open(link, '_blank');
  }

  deletenotifications(id) {
    this.notifications = this.notifications.filter(x => x._id !== id);
    this.notificationService.deleteNotification(id);
  }

}
