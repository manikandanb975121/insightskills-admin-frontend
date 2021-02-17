import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TestCreateComponent } from '../test-create/test-create.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(TestCreateComponent, {
      height: '300px',
      width: '600px',
    });
  }
}
