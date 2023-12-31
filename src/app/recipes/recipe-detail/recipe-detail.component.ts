import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  recipeId: number;

  constructor(
      private recipeService: RecipeService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.recipeId = +data['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.delete(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
