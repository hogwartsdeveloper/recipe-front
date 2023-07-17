import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    getRecipes$ = new BehaviorSubject<Recipe[]>(this.recipes.slice());


    constructor(private slService: ShoppingListService) {}

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.getRecipes$.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.getRecipes$.next(this.recipes.slice());
    }

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.getRecipes$.next(this.recipes.slice());
    }

    delete(index: number) {
        this.recipes.splice(index, 1)
        this.getRecipes$.next(this.recipes.slice());
    }
}
