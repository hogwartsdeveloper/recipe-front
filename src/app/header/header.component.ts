import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {Subject, take, takeUntil} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/models/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    destroy$ = new Subject();
    isAuth = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.authService.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                this.isAuth = !!user;
            });
    }

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

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
