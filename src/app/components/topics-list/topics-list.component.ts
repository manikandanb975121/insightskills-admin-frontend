import { Component, OnInit, OnDestroy } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { Subscription } from 'rxjs';
import { TopicsService } from '../../services/topics.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit, OnDestroy {
  // topics = [
  //   { title: 'Ages and Partners'},
  //   { title: 'Directions'},
  //   { title: 'Number Series'},
  //   { title: 'Time and Works'}
  // ];
  topics: Topic[] = [];
  topicsSub: Subscription;
  constructor(private topicsService: TopicsService, private router: Router) { }

  ngOnInit() {
    this.topicsService.getTopics();
    this.topicsSub = this.topicsService.getUpdatedListener().subscribe((topics: Topic[]) => {
      this.topics = topics;
      console.log(this.topics);
    });
  }
  ngOnDestroy() {
    this.topicsSub.unsubscribe();
  }
  deleteTopic(topicId) {
    this.topicsService.deleteTopic(topicId);
  }
  details(topicId) {
    this.router.navigate(['aptitude', topicId]);
  }
  enableAndDisable(topicId, adminEnable, index) {
    console.log(topicId);
    console.log(adminEnable);
    console.log(!adminEnable);
    this.topicsService.enableTopic(topicId, !adminEnable);
    this.topics[index].adminEnable = !adminEnable;
  }
}
