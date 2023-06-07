import { Component } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
  ];

  onAdd(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
  }

  onDelete(ingredient: Ingredient) {
      this.ingredients = this.ingredients.filter(
          el => el.name !== ingredient.name && el.amount !== ingredient.amount);
  }

  onClear() {
      this.ingredients = [];
  }
}
