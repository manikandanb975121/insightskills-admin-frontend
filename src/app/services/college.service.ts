import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private colleges = new Subject<any>();
  private collegeDetails = new Subject<any>();
  private collegeTests = new Subject<any>();
  private onlineTests = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  createCollege(CollegeName: string, placementcordinatorName: string, Email: string, PlacementPhoneNumber: string, Password: string) {

    // tslint:disable-next-line: max-line-length
    const college = { collegeName: CollegeName, PlacementCordinatorName: placementcordinatorName, email: Email, placementPhoneNumber: PlacementPhoneNumber, password: Password};
    this.http.post('http://localhost:1205/api/college/create', college).subscribe(response => {
      console.log(response);
      // this.router.navigate(['/login']);
    });
  }

  getCollegeById(collegeId) {
    this.http.get<{message: string, result: any}>(`http://localhost:1205/api/college/${collegeId}`).subscribe((response) => {
      console.log('details fetched');
      console.log(response.result);
      this.collegeDetails.next(response.result);
      this.collegeTest(collegeId);
      this.getCollegeOnlineTest(collegeId);
    });
  }

  getCollege() {
    this.http.get<{message: string, college: any}>('http://localhost:1205/api/college').subscribe((response) => {
      console.log(response);
      this.colleges.next(response.college);
    });
  }

  gegUpdatedColleges() {
   return this.colleges.asObservable();
  }

  getCollegeDetails() {
    return this.collegeDetails.asObservable();
  }

  collegeTest(testId: string) {
    this.http.get<{message: string, document: any}>(`http://localhost:1205/api/college/test/${testId}`).subscribe((res) => {
      console.log(res);
      this.collegeTests.next(res.document);
    });
  }

  getCollegeTests() {
    return this.collegeTests.asObservable();
  }

  getCollegeOnlineTest(collegeId) {
    this.http.get<{message: string, document: any}>(`http://localhost:1205/api/college/onlineTest/${collegeId}`).subscribe((res) => {
      console.log('get online test');
      console.log(res.document);
      this.onlineTests.next(res.document);
    });
  }

  getOnlineTest() {
    return this.onlineTests.asObservable();
  }
}
