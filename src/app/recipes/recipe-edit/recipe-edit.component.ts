import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
  }

  initForm() {
      let name = '';
      let imagePath = '';
      let description = '';
      let ingredients = new FormArray([]);

      if (this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          name = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          if (recipe.ingredients) {
              for (const ingredient of recipe.ingredients) {
                  ingredients.push(new FormGroup({
                      name: new FormControl(ingredient.name, Validators.required),
                      amount: new FormControl(ingredient.amount, [
                          Validators.required,
                          Validators.pattern(/^[1-9]+[0-9]*$/)
                      ]),
                  }))
              }
          }
      }

      this.form = new FormGroup({
          name: new FormControl(name, Validators.required),
          description: new FormControl(description, Validators.required),
          imagePath: new FormControl(imagePath, Validators.required),
          ingredients
      });
  }


  getIngredientControls() {
      return this.form.get('ingredients') as FormArray
  }

  onSubmit() {
      if (this.editMode) {
          this.recipeService.updateRecipe(this.id, this.form.value);
      } else {
          this.recipeService.addRecipe(this.form.value);
      }
      this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
      (this.form.get('ingredients') as FormArray).push(new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      }));
  }

  onRemoveIngredient(index: number) {
      (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onReset() {
      this.form.reset();
      this.router.navigate(['../'], {relativeTo: this.route});
  }
}
