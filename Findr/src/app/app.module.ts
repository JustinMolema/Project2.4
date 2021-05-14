import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginModule } from './User/login/login.module';
import { SignupModule } from './User/signup/signup.module';
import { PasswordforgottenModule } from './User/passwordforgotten/passwordforgotten.module';
import { GamemenuModule } from './User/gamemenu/gamemenu.module';
import { NavbarModule } from './User/navbar/navbar.module';
import { Routes, RouterModule } from '@angular/router';
import { TopbarModule } from './User/topbar/topbar.module';
import { ChatmenuModule } from './User/chatmenu/chatmenu.module';
import { FriendsmenuModule } from "./User/friendsmenu/friendsmenu.module";
import { ProfileModule } from "./User/profile/profile.module";

import { AdminLoginModule } from './admin/admin-login/admin-login.module';
import { SupportticketModule } from './admin/supportticket/supportticket.module';
import { ReporteduserModule } from './admin/reporteduser/reporteduser.module';



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        LoginModule,
        SignupModule,
        PasswordforgottenModule,
        FriendsmenuModule,
        GamemenuModule,
        NavbarModule,
        TopbarModule,
        ChatmenuModule,
        AdminLoginModule,
        SupportticketModule,
        ReporteduserModule,
        ProfileModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
