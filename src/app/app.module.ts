import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from "./shared/dropdown.directive";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {AuthComponent} from "./auth/auth.component";
import {LoadingComponent} from "./shared/loading/loading.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from "./shared/alert/alert.component";
import {PlaceholderDirective} from "./shared/placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      ShoppingListComponent,
      ShoppingEditComponent,
      DropdownDirective,
      AuthComponent,
      LoadingComponent,
      AlertComponent,
      PlaceholderDirective
  ],
  imports: [
    BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    HttpClientModule,
      AppRoutingModule,
  ],
  providers: [
      ShoppingListService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
