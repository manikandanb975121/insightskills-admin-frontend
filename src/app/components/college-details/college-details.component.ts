import { Component, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { MatTableDataSource, MatTableModule, MatSort, MatPaginator } from '@angular/material';


// Modal Pop Up
import { StudentsDetailsComponent } from '../students-details/students-details.component';

// Service
import { CollegeService } from '../../services/college.service';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  collegeDetails: any;
  students: MatTableDataSource<any>;
  tests: any;
  onlineTest: any;
  currentTest: any;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'CollegeTest', 'actions'];
  constructor(
    private route: ActivatedRoute,
    private collegeService: CollegeService,
    private dialog: MatDialog,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const testId = this.route.snapshot.paramMap.get('id');
    console.log(testId);
    this.collegeService.getCollegeById(testId);
    this.collegeService.getCollegeDetails().subscribe(response => {
      console.log(response);
      this.collegeDetails = response;
      this.students = new MatTableDataSource(response.students);
      this.students.paginator = this.paginator;
      console.log(this.students);
    });
    this.collegeService.getCollegeTests().subscribe(response => {
      console.log(response);
      this.tests = response;
    });
    this.collegeService.getOnlineTest().subscribe(response => {
      console.log(response);
      this.onlineTest = response;
    });
    // this.collegeService.collegeTest(testId);
  }

  openDashboard(templateRef, testId) {
    console.log(testId);
    this.currentTest = this.tests.filter(test => test._id === testId)[0];
    console.log(this.currentTest);
    const dialogRef = this.dialog.open(templateRef, {
        width: '1100px',
        height: '600px'
        // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
    });
  }

  applyFilter(filterValue: string) {
    this.students.filter = filterValue.trim().toLowerCase();
  }

  viewProfile(studentId) {
    console.log(studentId);
    const dialogRef = this.dialog.open(StudentsDetailsComponent, {
      width: '900px',
      height: '600px',
      data: { id: studentId }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
  });
    // this.studentService.getStudent(studentId);
  }

  openFav() {
    console.log('fav questions');
  }

  editProfile() {
    console.log('college questions');
  }
}
