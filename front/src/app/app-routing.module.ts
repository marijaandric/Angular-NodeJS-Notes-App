import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddnoteComponent } from './components/addnote/addnote.component';

const routes: Routes = [
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"login",
    component: LoginComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path:"home",
    component: HomeComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path:"add",
    component: AddnoteComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: "**",
    redirectTo: "home"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
