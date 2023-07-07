import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStorageService.getRecipes();
    }
}
