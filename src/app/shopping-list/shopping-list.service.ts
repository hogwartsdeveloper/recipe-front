import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    changeIngredient$ = new Subject<Ingredient[]>()
    startEdit$ = new Subject<number>();
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    onAdd(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.changeIngredient$.next(this.getIngredients());
    }

    onUpdate(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.changeIngredient$.next(this.getIngredients());
    }

    onDelete(index: number) {
        this.ingredients.splice(index, 1);
        this.changeIngredient$.next(this.getIngredients());
    }

    onClear() {
        this.ingredients = [];
        this.changeIngredient$.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.changeIngredient$.next(this.getIngredients());
    }
}
