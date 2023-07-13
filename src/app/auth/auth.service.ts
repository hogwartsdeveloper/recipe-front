import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUserData} from "./models/user-data.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/register', userData)
    }

    signIn(userData: IUserData) {
        return this.http.post<{token: string}>('http://localhost:5041/api/Auth/login', userData);
    }
}
