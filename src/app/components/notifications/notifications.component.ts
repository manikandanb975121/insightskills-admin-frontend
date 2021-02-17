import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


// Pop Up Modal
import { NotificationCreateComponent } from '../notification-create/notification-create.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(NotificationCreateComponent, {
      height: '500px',
      width: '800px',
    });
  }

}
