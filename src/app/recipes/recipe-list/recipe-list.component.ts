import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
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

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

}
