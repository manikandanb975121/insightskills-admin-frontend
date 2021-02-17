import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { MatDialog } from '@angular/material';

// Pratice Created Module
import { PracticeCreateComponent } from '../practice-create/practice-create.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private topicService: TopicsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.topicService.CollecttopicName();
    this.topicService.getTopicName().subscribe(response => {
      console.log(response);
    });
  }

  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(PracticeCreateComponent , {
      height: '500px',
      width: '700px',
    });
  }
}
