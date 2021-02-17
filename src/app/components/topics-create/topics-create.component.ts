import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TopicsService } from '../../services/topics.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-topics-create',
  templateUrl: './topics-create.component.html',
  styleUrls: ['./topics-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopicsCreateComponent implements OnInit {
  show = false;
  aptitudeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    descriptions: new FormControl('', Validators.required),
    adminEnable: new FormControl(false, Validators.required),
    collegeEnable: new FormControl(false, Validators.required)
  });
  topics = [
    {
      title: 'Ages and Partners',
      questions: [
        // tslint:disable-next-line: max-line-length
        { ques: 'The present ages of three colleague&#39;s are in proportions 3 : 5 : 7. Four years ago, the sum of thier ages was 48. find thier present ages (in years) ?',
          A: '12 , 20 and 28 years',
          B: '13 , 15 and 23 years',
          C: '11 , 16 and 19 years',
          D: '20 , 24 and 27 years',
          ans: 'A'
        },
        {
          // tslint:disable-next-line: max-line-length
          ques: 'The ratio of the Mother&#39;s age to her daughter&#39;s age is 9 : 5. The product of their ages is 1125. The ratio of their ages after five years will be :',
          A: '1 : 3',
          B: '2 : 3',
          C: '3 : 4',
          D: '5 : 3',
          ans: 'D'
        }
      ]
    },
    {
      title: 'Directions',
      questions: [
        {
          // tslint:disable-next-line: max-line-length
          ques: 'One day Ravi left home and cycled 10 km south wards, turned right and cycled 5 km and turned rightand cycled 10 km and turned left and cycled 10 km. how many kilometers will he have to cycle to reach his home straight ?',
          A: '10 Km',
          B: '15 Km',
          C: '20 Km',
          D: '25 Km',
          ans: 'D'
        },
        {
          // tslint:disable-next-line: max-line-length
          ques: 'Ajay, who is facing exactly in south-east direction, turns 45 degree in anti clock-wise direction, then 135 degree clockwise direction and then 90 degree in anti clock wise direction. In which direction Ajay is facing now?',
          A: 'North-West',
          B: 'East',
          C: 'South-East',
          D: 'West',
          ans: 'C'
        },

      ]
    }
  ];
  constructor(
  private topicsService: TopicsService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.aptitudeForm.invalid) {
      return;
    }
    console.log(this.aptitudeForm.value);
    this.topicsService.addTopics(this.aptitudeForm.value.title,
      this.aptitudeForm.value.descriptions,
      this.aptitudeForm.value.adminEnable,
      this.aptitudeForm.value.collegeEnable);
    // this.show = true;
    const msg =  `${this.aptitudeForm.value.title} Added As Topic`;
    this.aptitudeForm.reset();
  //   this.snackBar.open(msg, 'Dismiss', {
  //     verticalPosition: 'top',
  //     horizontalPosition: 'right',
  //     panelClass: 'snackbar',
  // });
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: msg,
        icon: 'check_circle_outline'
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 50000
    });
  // }
}
}
