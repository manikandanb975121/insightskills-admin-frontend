import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { TopicsService } from '../../services/topics.service';

import { mimeType } from './mime-type.validators';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-practice-create',
  templateUrl: './practice-create.component.html',
  styleUrls: ['./practice-create.component.css']
})
export class PracticeCreateComponent implements OnInit {

  topics: any;
  images = [];
  questions: any;
  title: string;
  difficulties: any;
  questionId = [];
  question: any;
  topic: any;
  simg = [];
  imagePreview: any;
  testForm = new FormGroup({
    // testDurations : new FormControl('', Validators.required),
    // topic: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    // difficulty: new FormControl('', Validators.required),
    solutions: new FormControl('', Validators.required),
    // img: new FormArray(null, { validators: [Validators.required], asyncValidators: [mimeType]}),
    // file: new FormControl('', Validators.required),
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
  });
  difficulty = [
    {
      value: 'Hard',
      name: 'Hard'
    },
    {
      value: 'Medium',
      name: 'Medium'
    },
    {
      value: 'Easy',
      name: 'Easy'
    }
  ];
  constructor(
    private topicService: TopicsService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.topicService.getTopics();
    this.topicService.getUpdatedListener().subscribe(response => {
      console.log(response);
      this.topics =  response;
    });
  }


  changeTopic(e) {
    console.log(e.value);
    if (e.value === undefined) {
      return;
    }
    const ques = this.topics.filter(question => question.id === e.value);
    console.log(ques);
    // console.log(ques[0].questions);
    this.questions = ques[0].question;
    this.title = ques[0].title;
    console.log(this.questions);
    console.log(this.title);
  }

  addQuestions(id, title) {
    if (this.questionId.length < 1) {
      this.questionId.push(id);
      this.question = id;
      console.log(title);
      this.topic = title;
      // console.log(this.questionId);
      // console.log(title);
      // console.log(this.topics);
      // const ques = this.topics.filter(x => x.title === title);
      // console.log(ques[0].question);
      // const questions = ques[0].question.find(y => y._id === id);
      // console.log(questions);
    //   const ques = this.topics.filter(question => question.id === id);
    //   console.log(ques);
    // // console.log(ques[0].questions);
    //   this.questions = ques[0].question;
    //   this.title = ques[0].title;
    //   console.log(this.questions);
    //   console.log(this.title);
    }
  }


  changeDiff(e) {
    this.difficulties = e.value;
    console.log(this.difficulties);
  }

  createPratice() {
    // console.log(this.testForm.value);
    // console.log(this.difficulties);
    // console.log(this.question);
    this.topicService.createPracticeQuestions(
      this.question,
      this.topic,
      this.testForm.value.message,
      this.difficulties,
      this.testForm.value.solutions,
      // this.testForm.value.image
      // this.simg
      this.testForm.value.image
    );
  }

  imagePicker(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log((event.target as HTMLInputElement).files[0]);
    this.testForm.patchValue({image: file});
    this.testForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      // console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }

  imagesPicker(event: Event) {

    const file = (event.target as HTMLInputElement).files;
    console.log(file);
    // tslint:disable-next-line: prefer-for-of
    for (let  i = 0; i < file.length; i++) {
      this.simg.push(file[i]);
    }
    // this.testForm.patchValue({
    //         image: file
    //        });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result);
        this.testForm.patchValue({
          image: reader.result
         });
      };
      reader.readAsDataURL(file[i]);
    }
  }


  openQuestions(template) {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(template, {
      height: '500px',
      width: '800px',
      data: this.questions
    });
  }

  onSubmit() {
    console.log('submitted');
  }
}
