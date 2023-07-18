import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule),
    },
    { path: 'shopping-list',
        component: ShoppingListComponent,
        canActivate: [AuthGuard]
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
