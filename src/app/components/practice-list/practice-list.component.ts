import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {

  practiceQuestions: any;
  constructor(
    private topicService: TopicsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.topicService.getPracticeQuestions();
    this.topicService.getUpdatedPracticeQuestions().subscribe(response => {
      console.log(response);
      this.practiceQuestions = response;
      console.log(this.practiceQuestions);
    });
  }
  deletePratice(id) {
    this.practiceQuestions = this.practiceQuestions.filter(questions => questions._id !== id);
    this.topicService.deletePracticeQuestions(id);
  }
  openPratice(id) {
    this.router.navigate(['practice', id]);
  }
}
