import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { TopbarComponent } from './components/dashboard/topbar/topbar.component';
import { ClientsComponent } from './components/dashboard/users/clients/clients.component';
import { SpecialistsComponent } from './components/dashboard/users/specialists/specialists.component';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { SpecializationComponent } from './components/dashboard/specialization/specialization.component';
import { HospitalsComponent } from './components/dashboard/hospitals/hospitals.component';
import { TopicsComponent } from './components/dashboard/topics/topics.component';
import { SymptomsComponent } from './components/dashboard/symptoms/symptoms.component';
import { AbuseReportsComponent } from './components/dashboard/abuse-reports/abuse-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelcomComponent } from './components/dashboard/payment/selcom/selcom.component';
import { SpecialistTransactionsComponent } from './components/dashboard/specialist-transactions/specialist-transactions.component';
import { UserPostsComponent } from './components/dashboard/discussions/user-posts/user-posts.component';
import { UserQuestionsComponent } from './components/dashboard/discussions/user-questions/user-questions.component';
import { SpecialistPostsComponent } from './components/dashboard/discussions/specialist-posts/specialist-posts.component';
import { SpecialistAnswersComponent } from './components/dashboard/discussions/specialist-answers/specialist-answers.component';
import { ArticlesComponent } from './components/dashboard/articles/articles.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './helpers/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HomeServicesComponent } from './components/dashboard/home-services/home-services.component';
import { HomeServicesSingleComponent } from './components/dashboard/home-services/home-services-single/home-services-single.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmedVisitsComponent } from './components/dashboard/home-services/confirmed-visits/confirmed-visits.component';
import { SubscriptionComponent } from './components/dashboard/users/subscription/subscription.component';
import { IncentiviedDoctorsComponent } from './components/dashboard/incentivied-doctors/incentivied-doctors.component';
import { IncentiveListComponent } from './components/dashboard/incentive-list/incentive-list.component';
import { ToastrModule } from 'ngx-toastr';
import { IncentiveGeneralComponent } from './components/dashboard/incentive-general/incentive-general.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ClientsComponent,
    SpecialistsComponent,
    SpecializationComponent,
    HospitalsComponent,
    TopicsComponent,
    SymptomsComponent,
    AbuseReportsComponent,
    SelcomComponent,
    SpecialistTransactionsComponent,
    UserPostsComponent,
    UserQuestionsComponent,
    SpecialistPostsComponent,
    SpecialistAnswersComponent,
    ArticlesComponent,
    MessagesComponent,
    HomeServicesComponent,
    HomeServicesSingleComponent,
    ConfirmedVisitsComponent,
    SubscriptionComponent,
    IncentiviedDoctorsComponent,
    IncentiveListComponent,
    IncentiveGeneralComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    NgSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
