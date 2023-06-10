import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  onAdd(ingredient: Ingredient) {
    this.shoppingListService.onAdd(ingredient);
  }

  onDelete(ingredient: Ingredient) {
    this.shoppingListService.onDelete(ingredient);
  }

  onClear() {
    this.shoppingListService.onClear();
  }
}
