import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Service
import { TopicsService } from '../../services/topics.service';
import { AdminCustomizedService } from '../../services/admin-customized.service';
// Model
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-admin-customized-questions-create',
  templateUrl: './admin-customized-questions-create.component.html',
  styleUrls: ['./admin-customized-questions-create.component.css']
})
export class AdminCustomizedQuestionsCreateComponent implements OnInit {
  createForm  = new FormGroup({
    title: new FormControl('', Validators.required),
    durations: new FormControl('',  Validators.required),
    score: new FormControl('', Validators.required)
    // topicName: new FormControl('', Validators.required)
  });
  topics: any;
  questions: Question[] = [];
  questionIDArray = [];
  questionIDArray2 = {
    questionsId: '',
    score: ''
  };
  types: any;
  sampleArray = [];
  type = [
    {
      name: 'Admin',
      value: 'Admin'
    },
    {
      name: 'Interview',
      value: 'Interview'
    }
  ];
  constructor(
    private topicService: TopicsService,
    private customizedService: AdminCustomizedService,
    private router: Router
    ) { }

  ngOnInit() {
    this.topicService.getTopics();
    this.topicService.getUpdatedListener().subscribe(response => {
      console.log(response);
      this.topics = response;
    });
  }

  changeTopic(e) {
    console.log(e.value);
    if (e.value !== undefined) {
      const ques = this.topics.filter(question => question.id === e.value);
      console.log(ques);
      if (ques[0] === undefined) {
        return;
      }
      console.log(ques[0].question);
      this.questions = ques[0].question;
      console.log(this.questions);
    } else {
      this.questions = [];
    }
    // const ques = this.topics.filter(question => question.id === e.value);
    // console.log(ques);
    // if (ques[0] === undefined) {
    //   return;
    // }
    // console.log(ques[0].question);
    // this.questions = ques[0].question;
    // console.log(this.questions);
  }


  changeType(e) {
    if (e.value === undefined) {
      return;
    } else {
      this.types = e.value;
      console.log(this.types);
    }
  }
  addQuestions(questionId) {
    // console.log(questionId);
    // if (this.questionIDArray.find(x => x === questionId)) {
    //   console.log('Already there');
    // } else {
    //   this.questionIDArray.push(questionId);
    // }
    // console.log(this.questionIDArray);

    console.log(this.createForm.value.score);
    if (this.questionIDArray.find(x => x === questionId)) {
      console.log('Already there');
      this.sampleArray.find(x => {
        if (x.questionsId === questionId) {
          x.score = this.createForm.value.score;
        }
      });
    } else {
      this.questionIDArray.push(questionId);
      this.questionIDArray2 = {
        questionsId: questionId,
        score: this.createForm.value.score
      };
      this.sampleArray.push(this.questionIDArray2);
      console.log(this.questionIDArray2);
    }


  }

  onSubmit() {
    // console.log(this.createForm.value);
    const status = 'NOT YET STARTED';
    console.log(this.sampleArray);
    let mark = 0;
    const maxmark = this.sampleArray.filter(x => {
      mark = x.score + mark;
    });
    console.log(mark);
    // tslint:disable-next-line: max-line-length
    this.customizedService.CreateCustomizedQuestions
    (
      this.createForm.value.title,
      // this.questionIDArray,
      this.sampleArray,
      mark,
      this.createForm.value.durations,
      status,
      this.types
    ).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/customized-list', { skipLocationChange: false }).then(() => {
        this.router.navigate(['customizedQuestions']);
      });
    });
  }
}
