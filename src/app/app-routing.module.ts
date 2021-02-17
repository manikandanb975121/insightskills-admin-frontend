import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegeComponent } from '../app/components/college/college.component';
import { AdminDashboardComponent } from '../app/components/admin-dashboard/admin-dashboard.component';
import { UploadComponent } from '../app/components/upload/upload.component';
import { AptitudeComponent } from '../app/components/aptitude/aptitude.component';
import { QuestionsComponent } from '../app/components/questions/questions.component';
import { PracticeListComponent } from '../app/components/practice-list/practice-list.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminCustomizedQuestionsComponent } from '../app/components/admin-customized-questions/admin-customized-questions.component';
import { AuthGuard } from './guard/auth.guard';
// tslint:disable-next-line: max-line-length
import { AdminCustomizedQuestionsListComponent } from '../app/components/admin-customized-questions-list/admin-customized-questions-list.component';

import { TestComponent } from '../app/components/test/test.component';
import { TestListComponent } from '../app/components/test-list/test-list.component';
import { TestDetailsComponent } from '../app/components/test-details/test-details.component';
import { AccountsComponent } from '../app/components/accounts/accounts.component';

import { CollegeDetailsComponent } from '../app/components/college-details/college-details.component';
import { PracticeDetailsComponent } from './components/practice-details/practice-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'aptitude', component: AptitudeComponent, canActivate: [AuthGuard]},
  {path: 'aptitude/:id', component: QuestionsComponent, canActivate: [AuthGuard]},
  {path: 'practiceList', component: PracticeListComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'customizedQuestions', component: AdminCustomizedQuestionsComponent, canActivate: [AuthGuard]},
  {path: 'customized-list', component: AdminCustomizedQuestionsListComponent},
  {path: 'test-list', component: TestListComponent, canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'test/:id', component: TestDetailsComponent, canActivate: [AuthGuard]},
  {path: 'college', component: CollegeComponent, canActivate: [AuthGuard]},
  {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  {path: 'accounts/college/:id', component: CollegeDetailsComponent, canActivate: [AuthGuard]},
  {path: 'practice/:id', component: PracticeDetailsComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'notificationList', component: NotificationListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
