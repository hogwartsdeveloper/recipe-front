import {Injectable} from "@angular/core";
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {switchMap, take} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user$
            .pipe(take(1), switchMap(user => {
                if (user) {
                    const modifiedReq = req.clone({
                        headers: new HttpHeaders().set('Authorization', `bearer ${user.token}`)
                    });
                    return next.handle(modifiedReq);
                }

                return next.handle(req);
            }))
    }
}
