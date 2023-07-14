import * as moment from "moment";

export class User {
    constructor(
        public email: string,
        private _token: string,
        private _tokenExpirationDate: number
    ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
