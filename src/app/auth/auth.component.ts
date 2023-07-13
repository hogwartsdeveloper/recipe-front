import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, take} from "rxjs";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    isLoginMode = true;
    form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
    });
    isLoading = false;
    errorMsg: string;

    constructor(private authService: AuthService) {}

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
                console.log(res);
                this.isLoading = false;
            }, error => {
                this.errorMsg = error?.error || 'Error'
                this.isLoading = false;
            });
        this.form.reset();
    }
}
