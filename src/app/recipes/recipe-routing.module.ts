import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes.component";
import {RecipeResolverService} from "./services/recipe-resolver.service";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        resolve: [RecipeResolverService],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}