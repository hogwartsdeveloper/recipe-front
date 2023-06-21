import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe 1',
            'This is simply a test', '' +
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
            [
                new Ingredient('Meat', 2),
                new Ingredient('Kinza', 10)
            ]
        ),
        new Recipe(
            'A Test Recipe 2',
            'This is simply a test', '' +
            'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
            [
                new Ingredient('Bread', 10),
                new Ingredient('Banana', 5)
            ]
        )
    ];


    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}
