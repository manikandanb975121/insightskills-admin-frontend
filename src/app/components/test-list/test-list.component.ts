import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';

import { MatDialog } from '@angular/material';

import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'medium',
        defaultOpen: false,
        closeOnSelect: false
    };
    date2: Date = new Date();
    settings2 = {
        bigBanner: true,
        timePicker: true,
        format: 'medium',
        defaultOpen: false,
        closeOnSelect: false
    };
  tests: any;
  startDate: any;
  endDate: any;
  constructor(
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.testService.getTest();
    this.testService.getTestUpdated().subscribe(response => {
      console.log(response);
      this.tests = response;
    });
  }
  startTest(testId: string, index, statusTestId) {
    console.log(testId);
    console.log(statusTestId);
    console.log(this.tests[index].test.status);
    this.tests[index].test.status = 'On Process';
    this.testService.startTest(testId);
    this.testService.updateStatus('On Process', statusTestId);
  }
  deletTest(testId: string, statusTestId) {
    console.log(testId);
    this.testService.DeleteTest(testId);
    this.testService.updateStartEndDate('', '', statusTestId);
    this.tests = this.tests.filter(test => test._id !== testId);
    console.log(this.tests);

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: 'Test Deleted',
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });

    // console.log(statusTestId);
  }
  ViewTest(testId: string) {
    // console.log(testId);
    this.router.navigate(['test', testId]);
  }
  stopTest(testId: string, index, statusTestId) {
    console.log(testId);
    console.log(this.tests[index].test.status);
    this.tests[index].test.status = 'NOT YET STARTED';
    this.testService.stopTest(testId);
    this.testService.updateStatus('NOT YET STARTED', statusTestId);
    this.testService.updateStartEndDate('', '', statusTestId);
  }

  onDateSelect(event) {
    // console.log(event);
    this.startDate = event;
  }

  onEndDateSelect(event) {
    // console.log(event);
    this.endDate = event;
  }
  openDate(templateRef) {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(templateRef, {
      width: '900px',
      height: '600px'
      // data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  submitDate(testId, index) {
    // console.log(testId);
    // console.log(this.startDate);
    // console.log(this.endDate);
    this.tests[index].test.startDate = this.startDate.toDateString();
    this.tests[index].test.endDate = this.endDate.toDateString();
    this.testService.updateStartEndDate(this.startDate, this.endDate, testId);
  }
}
