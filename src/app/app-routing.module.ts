import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule),
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
