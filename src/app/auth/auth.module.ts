import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations: [AuthComponent],
    providers: [],
    imports: [SharedModule, ReactiveFormsModule, AuthRoutingModule],
    exports: [AuthComponent]
})
export class AuthModule {}
