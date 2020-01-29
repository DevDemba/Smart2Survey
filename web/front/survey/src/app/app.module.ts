import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    SubscribeComponent,
    ConnectionComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'connection', component: ConnectionComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
