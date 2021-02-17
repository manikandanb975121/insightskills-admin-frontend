import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

// Student Add components
import { StudentsAddComponent } from '../students-add/students-add.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(StudentsAddComponent, {
      height: '700px',
      width: '700px',
    });
  }
}
