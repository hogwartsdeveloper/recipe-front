import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {take} from "rxjs";

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

    constructor(private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        console.log();
        if (!this.isLoginMode) {
            this.authService.signUp(this.form.getRawValue())
                .pipe(take(1))
                .subscribe(res => console.log(res));
            return;
        }

        this.authService.signIn(this.form.getRawValue())
            .pipe(take(1))
            .subscribe(res => console.log(res));
    }
}
