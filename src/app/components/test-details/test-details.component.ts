import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatTableModule, MatSort } from '@angular/material';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  testDetails: any;
  testTitle: string;
  studentData: MatTableDataSource<any>;
  students: any;
  hours: any;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'College', 'actions'];
  constructor(private testService: TestService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    const testId = this.route.snapshot.paramMap.get('id');
    console.log(testId);
    this.testService.getTestDetails(testId);
    this.testService.TestDetails().subscribe(response => {
      // console.log(response);
      this.testDetails = response;
      console.log(this.testDetails);
      console.log(this.testDetails.students);
      console.log(this.testDetails.test.startDate);
      console.log(this.testDetails.test.endDate);
      const startDate = new Date(this.testDetails.test.startDate);
      const endDate =  new Date(this.testDetails.test.endDate);
      const hour = Math.abs(startDate.getTime() - endDate.getTime()) / 36e5;
      this.hours = hour;
      this.studentData = new MatTableDataSource(this.testDetails.students);
    });
  }
  openModel(templateRef) {
    const dialogRef = this.dialog.open(templateRef, {
        width: '650px',
        height: '680px'
        // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
    });
}
openStudent(templateRef) {
  const dialogRef = this.dialog.open(templateRef, {
    width: '1200px',
    height: '600px'
    // data: { name: this.name, animal: this.animal }
});

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
  });
}
viewProfile(id) {
  console.log(id);
}
deleteStudent(id) {
  console.log(id);
}
}
