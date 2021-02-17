import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { CollegeService } from '../../services/college.service';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.css']
})
export class StudentsAddComponent implements OnInit {

  collegeName: any;
  collegeId: any;
  studentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mailId: new FormControl('', Validators.required),
    collegeId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    graduatingYear: new FormControl('', Validators.required),
  });
  constructor(
    private collegeService: CollegeService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.collegeService.gegUpdatedColleges().subscribe(response => {
      console.log(response);
      this.collegeName = response;
    });
  }
  changeTopic(event) {
    console.log(event.value);
    this.collegeId = event.value;
  }
  onSubmit() {
    // console.log(this.studentForm.value);
    this.studentForm.patchValue({
      collegeId: this.collegeId
    });
    // console.log(this.studentForm.value);
    this.studentService.createStudent(this.studentForm.value);
  }
}
