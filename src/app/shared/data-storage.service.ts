import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storageRecipes() {
        const data = [];
        const recipes = this.recipeService.getRecipes();;

        for (let i = 0; i < recipes.length; i++) {
            const ingredients = [];
            for (let y = 0; y < recipes[i]?.ingredients?.length; y++) {
                ingredients.push({id: y, ...recipes[i].ingredients[y]});
            }
            data.push({id: i, ...recipes[i], ingredients});
        }

        return this.http.put<Recipe[]>("http://localhost:5041/recipe", data);
    }

    getRecipes() {
        return this.http.get<Recipe[]>("http://localhost:5041/recipe");
    }
}
