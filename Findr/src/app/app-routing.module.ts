import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { GamemenuComponent } from './gamemenu/gamemenu.component';
import { AdminComponent } from './admin/admin.component';
import { PasswordforgottenComponent } from './passwordforgotten/passwordforgotten.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'games', component: GamemenuComponent},
    { path: 'admin', component: AdminComponent },
    {path: 'forgot-password', component: PasswordforgottenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
