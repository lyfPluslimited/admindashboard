import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/dashboard/users/clients/clients.component';
import { SpecialistsComponent } from './components/dashboard/users/specialists/specialists.component';
import { SpecializationComponent } from './components/dashboard/specialization/specialization.component';
import { HospitalsComponent } from './components/dashboard/hospitals/hospitals.component';
import { TopicsComponent } from './components/dashboard/topics/topics.component';
import { SymptomsComponent } from './components/dashboard/symptoms/symptoms.component';
import { AbuseReportsComponent } from './components/dashboard/abuse-reports/abuse-reports.component';
import { SelcomComponent } from './components/dashboard/payment/selcom/selcom.component';
import { SpecialistTransactionsComponent } from './components/dashboard/specialist-transactions/specialist-transactions.component';
import { UserPostsComponent } from './components/dashboard/discussions/user-posts/user-posts.component';
import { UserQuestionsComponent } from './components/dashboard/discussions/user-questions/user-questions.component';
import { SpecialistPostsComponent } from './components/dashboard/discussions/specialist-posts/specialist-posts.component';
import { SpecialistAnswersComponent } from './components/dashboard/discussions/specialist-answers/specialist-answers.component';
import { ArticlesComponent } from './components/dashboard/articles/articles.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home', 
        component: HomeComponent, 
      },

      //Discussions
      {
        path:'user-posts',
        component: UserPostsComponent
      },
      {
        path: 'user-questions',
        component: UserQuestionsComponent
      },
      {
        path: 'specialists-posts',
        component: SpecialistPostsComponent
      },
      {
        path: 'specialist-answers',
        component: SpecialistAnswersComponent
      },

      {
        path: 'message',
        component: MessagesComponent
      },

      {
        path: 'article',
        component: ArticlesComponent
      },

      //Users
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'specialists',
        component: SpecialistsComponent,
      },

      {
        path: 'transactions/:id',
        component: SpecialistTransactionsComponent
      },
      {
        path: 'specialization',
        component: SpecializationComponent
      },
      {
        path: 'hospitals',
        component: HospitalsComponent
      },
      {
        path: 'topics',
        component: TopicsComponent
      },
      {
        path: 'symptoms',
        component: SymptomsComponent
      },
      {
        path: 'abuse',
        component: AbuseReportsComponent
      },

      //Payment
      {
        path: 'selcom',
        component: SelcomComponent
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
