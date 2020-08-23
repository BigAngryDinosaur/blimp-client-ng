import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlFormComponent } from './url-form/url-form.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: 'home', component: UrlFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
