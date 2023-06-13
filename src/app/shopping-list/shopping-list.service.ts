import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    changeIngredient = new EventEmitter<Ingredient[]>();

    getIngredient() {
        return this.ingredients.slice();
    }

    onAdd(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.changeIngredient.emit(this.getIngredient());
    }

    onDelete(ingredient: Ingredient) {
        this.ingredients = this.ingredients.filter(
            el => el.name !== ingredient.name && el.amount !== ingredient.amount);
        this.changeIngredient.emit(this.getIngredient());
    }

    onClear() {
        this.ingredients = [];
        this.changeIngredient.emit(this.getIngredient());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.changeIngredient.emit(this.ingredients.slice());
    }
}
