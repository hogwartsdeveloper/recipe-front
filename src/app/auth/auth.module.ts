import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {AuthComponent} from "./auth.component";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations: [AuthComponent],
    providers: [AuthGuard, AuthService],
    imports: [SharedModule, ReactiveFormsModule, AuthRoutingModule],
    exports: [AuthComponent]
})
export class AuthModule {}
