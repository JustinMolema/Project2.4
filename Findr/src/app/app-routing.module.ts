import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './User/signup/signup.component';
import { GamemenuComponent } from './User/gamemenu/gamemenu.component';
import { PasswordforgottenComponent } from './User/passwordforgotten/passwordforgotten.component';
import { ChatmenuComponent } from './User/chatmenu/chatmenu.component';
import {FriendsmenuComponent} from "./User/friendsmenu/friendsmenu.component";
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ReporteduserComponent } from './admin/reporteduser/reporteduser.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'games', component: GamemenuComponent},
  {path: 'admin', component: AdminLoginComponent},
  {path: 'chats', component: ChatmenuComponent },
  {path: "friends", component: FriendsmenuComponent},
  {path: 'forgot-password', component: PasswordforgottenComponent},
  {path: 'admin/home', component: ReporteduserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
