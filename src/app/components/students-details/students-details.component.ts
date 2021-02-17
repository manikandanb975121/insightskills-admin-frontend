import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


// Services
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {

  student: any;
  aTest: any;
  cTest: any;
  constructor(
    public dialogRef: MatDialogRef<StudentsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.studentService.getStudent(this.data.id);
    this.studentService.getUpdatedStudentProfile().subscribe(response => {
      console.log(response);
      this.student = response;
    });
    this.studentService.getStudentTestDetails(this.data.id);
    this.studentService.getUpdatedTestDetails().subscribe(test => {
      // console.log(test);
      this.aTest = test[0].aTest;
      this.cTest = test[0].cTest;
      // console.log(this.aTest);
      console.log(this.cTest);
    });
  }

  percentage(x, y) {
    // console.log((x * 100) / y);
    return ((x * 100) / y );
  }
}
