import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


// Services
import { NotificationsService } from '../../services/notifications.service';
@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {

  links = [
  //  {
  //    id: 0,
  //    link: ''
  //  }
  ];
  link = [];
  notificationForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    links: new FormControl('', Validators.required)
  });
  constructor(
    private notificationServices: NotificationsService
  ) { }

  ngOnInit() {
  }

  addLinks() {
    this.links.push({
      id: this.links.length,
      link: this.notificationForm.value.links
    });
    this.notificationForm.patchValue({
      links: ''
    });
    console.log(this.links);
  }

  deleteLink(id) {
    console.log(id);
    const link = this.links.filter(x => x.id !== id);
    this.links = link;
    console.log(link);
  }
  onSubmit() {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.links.length; i++) {
      this.link.push(this.links[i].link);
      console.log(this.links[i]);
    }
    console.log(this.link);
    this.notificationServices.postNotifications(
      this.notificationForm.value.title,
      this.notificationForm.value.content,
      new Date(),
      this.link
    );
  }
}
