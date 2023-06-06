import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PlayComponent } from './pages/play/play.component';

const routes: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'play', component: PlayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
