import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material';
// import { TestListComponent } from '../test-list/test-list.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { AdminCustomizedService } from '../../services/admin-customized.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {
  testForm = new FormGroup({
    testDurations : new FormControl('', Validators.required)
  });

  testList: any;
  testId: any;
  constructor(
    private customizedService: AdminCustomizedService,
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.customizedService.getTest();
    this.customizedService.getUpdatedListener().subscribe(test => {
      this.testList = test;
      console.log(this.testList);
    });
  }

  changeTopic(test) {
    console.log(test.value);
    this.testId = test.value;
  }

  onSubmit() {
    console.log(this.testId);
    this.testService.createTest(this.testId);
    this.router.navigateByUrl('/test-list', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

}
