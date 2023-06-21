import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  changeIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredient();

      this.changeIngredientSub = this.shoppingListService.changeIngredient$
          .subscribe((ingredients) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
      this.changeIngredientSub.unsubscribe();
  }
}
