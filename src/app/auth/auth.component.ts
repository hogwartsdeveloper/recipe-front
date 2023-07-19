import {Component, ComponentFactoryResolver, ViewChild} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, take} from "rxjs";
import {Router} from "@angular/router";

import { AlertComponent } from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    isLoginMode = true;
    form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
    });
    isLoading = false;
    errorMsg: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        this.isLoading = true;
        this.errorMsg = null;
        let authObservable: Observable<{token: string}>;
        if (!this.isLoginMode) {
            authObservable = this.authService.signUp(this.form.getRawValue());
        } else {
            authObservable = this.authService.signIn(this.form.getRawValue());
        }

        authObservable.pipe(take(1))
            .subscribe(res => {
                this.isLoading = false;
                this.router.navigate(['recipes']);
            }, error => {
                this.errorMsg = error?.message || 'Error';
                this.showErrorAlert(this.errorMsg);
                this.isLoading = false;
            });
        this.form.reset();
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        componentRef.instance.close.pipe(take(1)).subscribe(() => {
            hostViewContainerRef.clear();
        });
    }
}
