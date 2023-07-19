import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {RecipeService} from "./recipes/services/recipe.service";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AuthService} from "./auth/auth.service";
import {DataStorageService} from "./shared/data-storage.service";
import {AuthGuard} from "./auth/auth.guard";

@NgModule({
    providers: [
        AuthService,
        DataStorageService,
        AuthGuard,
        RecipeService,
        ShoppingListService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule {}
