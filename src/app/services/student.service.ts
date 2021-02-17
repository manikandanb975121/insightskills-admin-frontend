import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUpdated = new Subject<any>();
  private studentProfile = new Subject<any>();
  private testScore = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  createStudent(student: any) {
    console.log(student);
    this.http.post<{message: string, result: any}>('http://localhost:1205/api/student/create', student).subscribe((response) => {
      console.log(response);
      // this.studentUpdated.next(response.result);
    });
  }

  getStudent(id) {
    this.http.get<{message: string, result: any}>(`http://localhost:1205/api/student/${id}`).subscribe((response) => {
      console.log(response);
      // this.studentUpdated.next(response.result);
      this.studentProfile.next(response.result);
    });
  }

  getUpdatedStudentProfile() {
    return this.studentProfile.asObservable();
  }

  getStudentTestDetails(id) {
    this.http.get<{ message: string, result: any}>(`http://localhost:1205/api/student/test/${id}`).subscribe(response => {
      // console.log(response);
      this.testScore.next(response.result);
    });
  }

  getUpdatedTestDetails() {
    return this.testScore.asObservable();
  }
}
