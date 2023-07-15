export class User {
    constructor(
        public email: string,
        private _token: string,
        private _tokenExpiration: number
    ) {}

    get token() {
        if (!this._tokenExpiration || new Date().getTime() > this._tokenExpiration) {
            return null;
        }
        return this._token;
    }

    get tokenExpiration() {
        return this._tokenExpiration;
    }
}
