import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { PasswordforgottenModule } from './passwordforgotten/passwordforgotten.module';
import { GamemenuModule } from './gamemenu/gamemenu.module';
import { NavbarModule } from './navbar/navbar.module';
import { AdminModule } from './admin/admin.module';
import { Routes, RouterModule } from '@angular/router';
import { ChatmenuModule } from './chatmenu/chatmenu.module';

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
        GamemenuModule,
        NavbarModule,
        AdminModule,
        ChatmenuModule

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
