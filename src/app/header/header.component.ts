import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {take} from "rxjs";
import {RecipeService} from "../recipes/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    onSave() {
        this.dataStorageService.storageRecipes()
            .pipe(take(1))
            .subscribe(res => console.log(res));
    }

    onGet() {
        this.dataStorageService.getRecipes()
            .pipe(take(1))
            .subscribe(res => this.recipeService.setRecipe(res));
    }
}
