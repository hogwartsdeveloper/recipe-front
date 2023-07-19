import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {AuthComponent} from "./auth/auth.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      AuthComponent,
  ],
  imports: [
    BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    HttpClientModule,
      AppRoutingModule,
      SharedModule
  ],
  providers: [
      ShoppingListService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
