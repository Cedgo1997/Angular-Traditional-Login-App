import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1";
  private api_key = "AIzaSyBSN2x9omREGVYb4kggaySwF5A_-ehPZD0";

  /* Crear nuevo usuario */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  /* Log In */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] */

  constructor(private http: HttpClient) {}

  signUp(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.api_key}`,
      authData
    );
  }

  logIn(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.api_key}`,
      authData
    );
  }

  logOut() {}
}
