import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
    ) {}

    storageRecipes() {
        return this.http.put<Recipe[]>("/api/recipe", this.recipeService.getRecipes());
    }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(
                "/api/recipe"
        ).pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe?.ingredients || []}
            })
        }), tap(recipes => this.recipeService.setRecipe(recipes)));

    }
}
