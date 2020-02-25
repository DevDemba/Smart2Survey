import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { HistoryComponent } from './pages/history/history.component';

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
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'connection', component: ConnectionComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'survey', component: SurveyComponent },
      { path: 'history', component: HistoryComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
