import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUserData} from "./models/user-data.model";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "./models/user.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    user$ = new BehaviorSubject<User>(null);
    logoutTimeout: ReturnType<typeof setTimeout>;
    constructor(private http: HttpClient, private router: Router) {}

    signUp(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/register', userData)
            .pipe(tap((res) => this.getTokenPayloadData(res.token)));
    }

    signIn(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/login', userData)
            .pipe(tap((res) => this.getTokenPayloadData(res.token)));
    }

    autoLogin() {
        const userData: {
            email: string,
            _token: string,
            _tokenExpirationDate: number
        } = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            return;
        }

        const user = new User(userData.email, userData._token, userData._tokenExpirationDate);
        if (!user.token) {
            return;
        }
        this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
        this.user$.next(user);

    }

    autoLogout(expiration: number) {
        this.clearLogoutTimer();
        this.logoutTimeout = setTimeout(() => {
            this.logout();
        }, expiration);
    }

    logout() {
        this.user$.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        this.clearLogoutTimer();
    }

    private clearLogoutTimer() {
        if (this.logoutTimeout) {
            clearTimeout(this.logoutTimeout);
        }
    }

    private getTokenPayloadData(token: string) {
        const payload = this.parseJWT(token);
        const data: any = {}
        for (let [key, value] of Object.entries(payload)) {
            if (key.includes('/')) {
                const keys = key.split('/');
                key = keys[keys.length - 1];
            }

            data[key] = value;
        }

        const user = new User(data.emailaddress, token, new Date(data.expired).getTime());
        this.autoLogout(new Date(data.expired).getTime() - new Date().getTime());
        this.user$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    private parseJWT(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
