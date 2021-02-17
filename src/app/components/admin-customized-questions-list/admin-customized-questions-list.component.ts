import { Component, OnInit } from '@angular/core';
import { AdminCustomizedService } from '../../services/admin-customized.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-customized-questions-list',
  templateUrl: './admin-customized-questions-list.component.html',
  styleUrls: ['./admin-customized-questions-list.component.css']
})
export class AdminCustomizedQuestionsListComponent implements OnInit {
  testDetails: any;
  constructor(private customizedService: AdminCustomizedService,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.customizedService.getTest();
    this.customizedService.getUpdatedListener().subscribe(test => {
      this.testDetails = test;
      console.log(this.testDetails);
    });
  }
  deleteQuestions(testId) {
    console.log(testId);
    this.customizedService.deleteTest(testId);
    this.testDetails = this.testDetails.filter(x => x.id !== testId);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: 'Test Deleted',
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });

  }
}
