import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  changeIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {}

  ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients();

      this.changeIngredientSub = this.shoppingListService.changeIngredient$
          .subscribe((ingredients) => this.ingredients = ingredients);

      this.loggingService.printLog('Hello from ShopComponent ngOnInit');
  }

  onEdit(index: number) {
      this.shoppingListService.startEdit$.next(index);
  }

  ngOnDestroy() {
      this.changeIngredientSub.unsubscribe();
  }
}
