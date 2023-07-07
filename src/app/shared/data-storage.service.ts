import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storageRecipes() {
        return this.http.put<Recipe[]>("http://localhost:5041/recipe", this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get<Recipe[]>("http://localhost:5041/recipe")
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe?.ingredients || []};
                })
            }), tap(recipes => this.recipeService.setRecipe(recipes)));
    }
}
