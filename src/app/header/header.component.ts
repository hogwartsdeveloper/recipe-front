import {Component, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {take} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    constructor(private dataStorageService: DataStorageService) {}

    ngOnInit() {}

    onSave() {
        this.dataStorageService.storageRecipes()
            .pipe(take(1))
            .subscribe(res => console.log(res));
    }

    onGet() {
        this.dataStorageService.getRecipes()
            .pipe(take(1))
            .subscribe();
    }
}
