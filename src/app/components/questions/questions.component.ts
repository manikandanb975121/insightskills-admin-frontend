import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TopicsService } from '../../services/topics.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public topic: any;
  questionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    optA: new FormControl('', Validators.required),
    optB: new FormControl('', Validators.required),
    optC: new FormControl('', Validators.required),
    optD: new FormControl('', Validators.required),
    ans: new FormControl('', Validators.required)
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private topicsService: TopicsService) { }
  topicId: string;
  questions: any;
  ngOnInit() {
    // tslint:disable-next-line: radix
    const id = this.route.snapshot.paramMap.get('id');
    this.topicId = id;
    this.topicsService.getTopicById(this.topicId);
    this.topicsService.getTopicUpdatedListener().subscribe(data => {
      this.topic = data;
      console.log(this.topic);
      this.questions = this.topic.questions;
      console.log(this.questions);
    });
  }
  onSubmit() {
    console.log(this.questionForm.value);
    const questions = this.questionForm.value;
    this.topicsService.addQuestions(this.topicId, questions).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: no-string-literal
      // this.questions = data['question'];
      // this.questions = data.question;
      // this.questions.push(this.questionForm.value);
      this.questionForm.reset();
    });
    // this.questions.push(this.questionForm.value);
    // this.questionForm.reset();
    // this.questions = null;
    // this.notification('New Question Added');
  }
  deleteQuestions(questionId, topicId) {
    console.log(questionId);
    console.log(topicId);
    this.topicsService.deleteQuestion(topicId, questionId);
    const updatedQuestion = this.questions.filter(question => question._id !== questionId);
    this.questions = updatedQuestion;
    this.notification('Question has been deleted');
  }
  notification(msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: msg,
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 50000
    });
  }
}
