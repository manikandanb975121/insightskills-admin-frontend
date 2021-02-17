import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


// Services
import { TopicsService } from '../../services/topics.service';
@Component({
  selector: 'app-practice-details',
  templateUrl: './practice-details.component.html',
  styleUrls: ['./practice-details.component.css']
})
export class PracticeDetailsComponent implements OnInit {

  practices: any;
  constructor(
    private route: ActivatedRoute,
    private topicService: TopicsService
  ) { }

  ngOnInit() {
    const practiceId = this.route.snapshot.paramMap.get('id');
    this.topicService.viewTopics(practiceId);
    this.topicService.getPracticeById().subscribe(response => {
      this.practices = response;
      console.log(this.practices);
    });
  }

}
