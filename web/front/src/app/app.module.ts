import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { HistoryComponent } from './pages/history/history.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    SubscribeComponent,
    ConnectionComponent,
    ProfileComponent,
    SurveyComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'connection', component: ConnectionComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
      { path: 'survey', component: SurveyComponent },
      { path: 'history', component: HistoryComponent }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
