import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login';
import { AuthenticationService, BackendService, PagerService } from './_services';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './notfoundpage';
import { ConfirmDialog } from './shared/dialog.component';
import { LoadingComponent } from  './loading';
import { AuthGuard } from './_guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateticketComponent } from './createticket/createticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

@NgModule({
  declarations: [
    LoginComponent,
    NotFoundPageComponent,
    ConfirmDialog,
    LoadingComponent,
    AppComponent,
    CreateticketComponent,
    ViewTicketComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatProgressBarModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    BackendService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
