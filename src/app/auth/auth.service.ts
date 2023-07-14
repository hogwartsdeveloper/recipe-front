import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUserData} from "./models/user-data.model";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "./models/user.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    user$ = new BehaviorSubject<User>(null)
    constructor(private http: HttpClient) {}

    signUp(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/register', userData)
            .pipe(tap((res) => this.getTokenPayloadData(res.token)));
    }

    signIn(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/login', userData)
            .pipe(tap((res) => this.getTokenPayloadData(res.token)));
    }

    logout() {
        this.user$.next(null);
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
        this.user$.next(user);
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
