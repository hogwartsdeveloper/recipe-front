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
            data.push({id: i, ...recipes[i]});
        }

        return this.http.put<Recipe[]>("http://localhost:5041/recipe", data);
    }

    getRecipes() {
        return this.http.get<Recipe[]>("http://localhost:5041/recipe");
    }
}
