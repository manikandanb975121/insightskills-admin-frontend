import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

// Colleg Add Components
import { CollegeAddComponent } from '../college-add/college-add.component';
@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(CollegeAddComponent, {
      height: '500px',
      width: '700px',
    });
  }
}
