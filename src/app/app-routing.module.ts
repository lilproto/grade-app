import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './views/welcome/welcome.component'
import { CheckAnswerComponent } from './views/check-answer/check-answer.component'

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "check", component: CheckAnswerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
