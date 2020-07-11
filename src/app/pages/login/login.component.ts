import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  user: UserModel = new UserModel();

  ngOnInit() {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.logIn(this.user).subscribe(
      (userData) => console.log(userData),
      (err) => {
        console.log(err.error.error.message);
      }
    );
  }
}
