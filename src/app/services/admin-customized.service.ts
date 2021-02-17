import { Injectable } from '@angular/core';
import { Topic } from '../models/topic.model';
import { Question } from '../models/question.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomizedService {
  private questions: Question[] = [];
  private questionsUpdated = new Subject<Question[]>();

  constructor(private http: HttpClient) { }

  CreateCustomizedQuestions(title: string, ids: any, maxMark: number, durations: number, status: string, type: string) {
    console.log(title, ids);
    // tslint:disable-next-line: object-literal-shorthand
    const customizedQuestions = { title: title, questionsIds: ids, maxMark: maxMark, durations: durations, status: status, type: type};
    console.log(customizedQuestions);
    return this.http.post('http://localhost:1205/api/create/customizedTest', customizedQuestions);
  }

  getTest() {
    this.http.get<{message: string, topics: any}>('http://localhost:1205/api/create/customizedTest')
    .pipe(map((topicData) => {
      return topicData.topics.map(topic => {
        console.log(topic);
        return {
          title: topic.title,
          questions: topic.questionID,
          mark: topic.maxmark,
          id: topic._id
        };
      });
    }))
    .subscribe((transformedTopic) => {
      this.questions = transformedTopic;
      this.questionsUpdated.next([...this.questions]);
    });
  }

  getUpdatedListener() {
    return this.questionsUpdated.asObservable();
  }

  deleteTest(testId) {
    this.http.delete(`http://localhost:1205/api/create/customizedTest/${testId}`).subscribe(data => {
      console.log(data);
    });
  }
}
