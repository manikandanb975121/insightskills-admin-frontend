import { Injectable } from '@angular/core';
import { Topic } from '../models/topic.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private topics: Topic[] = [];
  private topic = [];
  private topicNames = [];
  private postsUpdated = new Subject<Topic[]>();
  private topicUpdated = new Subject();
  private topicName = new Subject();
  private practiceQuestions = new Subject<any>();
  private GetPractice = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  getTopics() {
    this.http.get<{message: string, topics: any}>('http://localhost:1205/api/topics')
    .pipe(map((topicData) => {
      console.log(topicData);
      return topicData.topics.map(topic => {
        return {
          title: topic.title,
          descriptions: topic.descriptions,
          adminEnable: topic.adminEnable,
          id: topic._id,
          question : topic.questions
        };
      });
    }))
    .subscribe((transformedTopic) => {
      this.topics = transformedTopic;
      this.postsUpdated.next([...this.topics]);
    });
  }
  getUpdatedListener() {
    return this.postsUpdated.asObservable();
  }
  getTopicUpdatedListener() {
    return this.topicUpdated.asObservable();
  }
  addTopics(title: string, descriptions: string, adminEnable: boolean, collegeEnable: boolean) {
    // tslint:disable-next-line: object-literal-shorthand
    const topic: Topic = { id: null, title: title, descriptions: descriptions, adminEnable: adminEnable, collegeEnable: collegeEnable };
    this.http.post<{message: string, topicId: string}>('http://localhost:1205/api/topics', topic).subscribe(responseData => {
      console.log(responseData.message);
      const id = responseData.topicId;
      topic.id = id;
      this.topics.push(topic);
      this.postsUpdated.next([...this.topics]);
    });
  }
  deleteTopic(topicId: string) {
    this.http.delete(`http://localhost:1205/api/topics/${topicId}`).subscribe(() => {
      const updatedTopics = this.topics.filter(topic => topic.id !== topicId);
      this.topics = updatedTopics;
      this.postsUpdated.next([...this.topics]);
    });
  }
  getTopicById(topicId: string) {
    this.http.get<{message: string, topics: any}>(`http://localhost:1205/api/topics/${topicId}`).subscribe((topicData) => {
      console.log(topicData.topics);
      console.log(topicData);
      this.topic = topicData.topics;
      this.topicUpdated.next(this.topic);
    });
  }
  addQuestions(topicId: string, questions: any) {
    console.log(questions);
    return this.http.post(`http://localhost:1205/api/topics/${topicId}`, questions);
  }
  deleteQuestion(topicId: string, questionId: string) {
    this.http.delete(`http://localhost:1205/api/topics/${topicId}/${questionId}`).subscribe(() => {
      console.log('Question has been deleted !');
    });
  }
  enableTopic(topicId: string, enable: boolean) {
    this.http.put(`http://localhost:1205/api/topics/${topicId}`, {adminEnable: enable}).subscribe(() => {
      console.log('Updated');
    });
  }
  getTopicName() {
    return this.topicName.asObservable();
  }
  CollecttopicName() {
    this.http.get<{message: string, topics: any}>('http://localhost:1205/api/topics').subscribe(response => {
      // console.log(response.topics);
      this.topicNames = response.topics;
      // tslint:disable-next-line: prefer-const
      let topic = [];
      this.topicNames.forEach(res => {
        // this.topicName.next(res.title);
        topic.push(res.title);
      });
      // console.log(this.topicName);
      this.topicName.next(topic);
    });
  }

  createPracticeQuestions(question, topic, message, difficulty, solution, image) {
    const data = new FormData();
    data.append('question', question);
    data.append('topic', topic);
    data.append('message', message);
    data.append('difficulty', difficulty);
    data.append('solution', solution);
    data.append('image', image);
    // console.log(data);
    // console.log(question);
    // console.log(topic);
    // console.log(image);
    // const data = {
    //   // tslint:disable-next-line: object-literal-shorthand
    //   question: question, topic: topic, message: message, difficulty: difficulty, solution: solution, image: image
    // };
    // console.log(data);
    data.forEach((value, key) => {
      console.log(key, value);
      });
    // tslint:disable-next-line: object-literal-shorthand
    // const practice = { questionId: questionId, topicTitle: topicTitle };
    this.http.post('http://localhost:1205/api/practice', data).subscribe((response) => {
      console.log(response);
      // this.router.navigateByUrl('/practiceList', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['upload']);
      // });
    });
  }
  getPracticeQuestions() {
    this.http.get<{message: string, result: any}>('http://localhost:1205/api/practice').subscribe(response => {
      console.log(response);
      this.practiceQuestions.next(response.result);

    });
  }
  getUpdatedPracticeQuestions() {
    return this.practiceQuestions.asObservable();
  }

  deletePracticeQuestions(id: string) {
    this.http.delete(`http://localhost:1205/api/practice/${id}`).subscribe((response) => {
      console.log(response);
    });
  }

  viewTopics(id) {
    this.http.get<{ result: any, message: any}>(`http://localhost:1205/api/practice/${id}`).subscribe((response) => {
      console.log(response);
      this.GetPractice.next(response.result);
    });
  }

  getPracticeById() {
    return this.GetPractice.asObservable();
  }
}
