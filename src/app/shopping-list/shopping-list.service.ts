import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    changeIngredient$ = new Subject<Ingredient[]>()

    getIngredient() {
        return this.ingredients.slice();
    }

    onAdd(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.changeIngredient$.next(this.getIngredient());
    }

    onDelete(ingredient: Ingredient) {
        this.ingredients = this.ingredients.filter(
            el => el.name !== ingredient.name && el.amount !== ingredient.amount);
        this.changeIngredient$.next(this.getIngredient());
    }

    onClear() {
        this.ingredients = [];
        this.changeIngredient$.next(this.getIngredient());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.changeIngredient$.next(this.getIngredient());
    }
}
