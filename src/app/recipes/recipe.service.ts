import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe 1',
            'This is simply a test', '' +
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg'
        ),
        new Recipe(
            'A Test Recipe 2',
            'This is simply a test', '' +
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg'
        )
    ];

    readonly selectedRecipe = new EventEmitter<Recipe>();

    getRecipe() {
        return this.recipes.slice();
    }
}
