import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        console.log(this.form);
    }
}
