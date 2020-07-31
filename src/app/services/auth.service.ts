import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1";
  private api_key = "";

  userToken: string;

  /* Crear nuevo usuario */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  /* Log In */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] */

  constructor(private http: HttpClient) {
    this.readToken();
  }

  signUp(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}/accounts:signUp?key=${this.api_key}`, authData)
      .pipe(
        map((resp) => {
          this.saveToken(resp["idToken"]);
          return resp;
        })
      );
  }

  logIn(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    return this.http
      .post(
        `${this.url}/accounts:signInWithPassword?key=${this.api_key}`,
        authData
      )
      .pipe(
        map((resp) => {
          this.saveToken(resp["idToken"]);
          return resp;
        })
      );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    let now = new Date();
    now.setSeconds(3600);

    localStorage.setItem("exp", now.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
  }

  logOut() {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const exp = Number(localStorage.getItem("exp"));
    const now = new Date();
    now.setTime(exp);

    if (now > new Date()) {
      return true;
    } else {
      return false;
    }

    return this.userToken.length > 2;
  }
}
