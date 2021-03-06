import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './User/login/auth.interceptor';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginModule} from './User/login/login.module';
import {SignupModule} from './User/signup/signup.module';
import {PasswordforgottenModule} from './User/passwordforgotten/passwordforgotten.module';
import {GamemenuModule} from './User/gamemenu/gamemenu.module';
import {NavbarModule} from './User/navbar/navbar.module';
import {TopbarModule} from './User/topbar/topbar.module';
import {ChatmenuModule} from './User/chatmenu/chatmenu.module';
import {FriendsmenuModule} from './User/friendsmenu/friendsmenu.module';
import {ProfileModule} from './User/profile/profile.module';

import {AdminLoginModule} from './admin/admin-login/admin-login.module';
import {SupportticketModule} from './admin/supportticket/supportticket.module';
import {ReporteduserModule} from './admin/reporteduser/reporteduser.module';
import {AdminBarModule} from './admin/admin-bar/admin-bar.module';
import {DatePipe} from '@angular/common';
import {GamesModule} from './admin/games/games.module';
import {UsersModule} from './admin/users/users.module';
import {TableheaderModule} from './admin/tableheader/tableheader.module';
import {AssignedticketsModule} from './admin/assignedtickets/assignedtickets.module';
import {TabledataModule} from './admin/tabledata/tabledata.module';
import {AdmintopbarModule} from "./admin/admintopbar/admintopbar.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {globalFindrMethods} from "./sharedmodule/global.findr.methods";
import {TicketModule} from "./User/ticket/ticket.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // registrationStrategy: 'registerImmediately',
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
        AdminBarModule,
        ProfileModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        GamesModule,
        UsersModule,
        TableheaderModule,
        AssignedticketsModule,
        HttpClientModule,
        TabledataModule,
        AdmintopbarModule,
        BrowserAnimationsModule,
        TicketModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [DatePipe, HttpClient, globalFindrMethods, [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }]],
    bootstrap: [AppComponent],
})
export class AppModule {
}

