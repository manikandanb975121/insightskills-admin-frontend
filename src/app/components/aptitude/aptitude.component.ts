import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { MatDialog } from '@angular/material';
import { TopicsCreateComponent } from '../topics-create/topics-create.component';
@Component({
  selector: 'app-aptitude',
  templateUrl: './aptitude.component.html',
  styleUrls: ['./aptitude.component.css']
})
export class AptitudeComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(TopicsCreateComponent, {
      height: '400px',
      width: '800px',
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`); // Pizza!
    // });
    // dialogRef.close('Pizza!');
  }
}
