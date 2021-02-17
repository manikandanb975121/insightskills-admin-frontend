import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { TopicsService } from '../app/services/topics.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatCardModule } from '@angular/material';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollegeComponent } from './components/college/college.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadComponent } from './components/upload/upload.component';
import { AptitudeComponent } from './components/aptitude/aptitude.component';
import { TopicsCreateComponent } from './components/topics-create/topics-create.component';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { PracticeCreateComponent } from './components/practice-create/practice-create.component';
import { PracticeListComponent } from './components/practice-list/practice-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestComponent } from './components/test/test.component';
import { TestCreateComponent } from './components/test-create/test-create.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { AdminCustomizedQuestionsComponent } from './components/admin-customized-questions/admin-customized-questions.component';
// tslint:disable-next-line: max-line-length
import { AdminCustomizedQuestionsCreateComponent } from './components/admin-customized-questions-create/admin-customized-questions-create.component';
// tslint:disable-next-line: max-line-length
import { AdminCustomizedQuestionsListComponent } from './components/admin-customized-questions-list/admin-customized-questions-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthInterceptor } from './services/auth-interceptor';
// tslint:disable-next-line: max-line-length
import { AdminCustomizedQuestionsDetailsComponent } from './components/admin-customized-questions-details/admin-customized-questions-details.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';


import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CollegeAddComponent } from './components/college-add/college-add.component';
import { CollegeListComponent } from './components/college-list/college-list.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentsAddComponent } from './components/students-add/students-add.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CollegeDetailsComponent } from './components/college-details/college-details.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { PracticeDetailsComponent } from './components/practice-details/practice-details.component';
import { NotificationCreateComponent } from './components/notification-create/notification-create.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationDetailsComponent } from './components/notification-details/notification-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CollegeComponent,
    AdminDashboardComponent,
    HeaderComponent,
    UploadComponent,
    AptitudeComponent,
    TopicsCreateComponent,
    TopicsListComponent,
    SnackbarComponent,
    QuestionsComponent,
    QuestionsListComponent,
    PracticeCreateComponent,
    PracticeListComponent,
    ProfileComponent,
    TestComponent,
    TestCreateComponent,
    TestListComponent,
    AdminCustomizedQuestionsComponent,
    AdminCustomizedQuestionsCreateComponent,
    AdminCustomizedQuestionsListComponent,
    LoginComponent,
    SignupComponent,
    AdminCustomizedQuestionsDetailsComponent,
    TestDetailsComponent,
    CollegeAddComponent,
    CollegeListComponent,
    AccountsComponent,
    StudentsComponent,
    StudentsAddComponent,
    StudentsListComponent,
    CollegeDetailsComponent,
    StudentsDetailsComponent,
    PracticeDetailsComponent,
    NotificationCreateComponent,
    NotificationListComponent,
    NotificationDetailsComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    LayoutModule,
    MatExpansionModule,
    MatSnackBarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    AngularDateTimePickerModule
  ],
  // providers: [TopicsService],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    TopicsCreateComponent,
    SnackbarComponent,
    PracticeCreateComponent,
    TestCreateComponent,
    CollegeAddComponent,
    StudentsAddComponent,
    StudentsDetailsComponent,
    NotificationCreateComponent
  ],
})
export class AppModule { }
