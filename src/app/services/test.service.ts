import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testUpdated = new Subject<any>();
  private testDetails = new Subject<any>();
  constructor(
    private http: HttpClient,
    private router: Router) { }

  createTest(test: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const collegeTest = { test: test};
    this.http.post('http://localhost:1205/api/test', collegeTest).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/test-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      });
    });
  }

  getTest() {
    this.http.get<{messag: string, test: any}>('http://localhost:1205/api/test').subscribe((response) => {
      // console.log(response);
      this.testUpdated.next(response.test);
    });
  }


  getTestUpdated() {
    return this.testUpdated.asObservable();
  }

  TestDetails() {
    return this.testDetails.asObservable();
  }

  startTest(testId: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const test = { test: testId};
    this.http.post('http://localhost:1205/api/test/start', test).subscribe((response) => {
      console.log(response);
    });
  }


  DeleteTest(testId: string) {
    this.http.delete(`http://localhost:1205/api/test/${testId}`).subscribe(() => {
      console.log('deleted');
    });
  }


  updateStatus(status: string, customizedTestId) {
    console.log(status);
    // tslint:disable-next-line: object-literal-shorthand
    const value = { status : status, id: customizedTestId };
    this.http.post('http://localhost:1205/api/test/status', value).subscribe(() => {
      console.log('status updated!');
    });
  }

  updateStartEndDate(startDate: string, endDate: string, testId: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const value = { startDate: startDate, endDate: endDate, id: testId};
    console.log(value);
    this.http.post('http://localhost:1205/api/test/date', value).subscribe(() => {
      console.log('status updated!');
    });
  }


  getTestDetails(testId: string) {
    this.http.get<{message: string, result: any}>(`http://localhost:1205/api/test/${testId}`).subscribe((response) => {
      console.log(response);
      this.testDetails.next(response.result);
    });
  }

  stopTest(testId: string) {
    // const test = { test: testId};
    this.http.delete(`http://localhost:1205/api/test/stop/${testId}`).subscribe((response) => {
      console.log(response);
    });
  }
}
