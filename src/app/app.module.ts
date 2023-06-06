import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamepageComponent } from './reusable/gamepage/gamepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './reusable/navbar/navbar.component';
import { PlayComponent } from './pages/play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    GamepageComponent,
    LoginpageComponent,
    HomepageComponent,
    NavbarComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
