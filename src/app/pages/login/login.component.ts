import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

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

    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Please, wait...",
    });
    Swal.showLoading();

    this.auth.logIn(this.user).subscribe(
      (userData) => {
        console.log(userData);
        Swal.close();
      },
      (err) => {
        Swal.fire({
          type: "error",
          title: 'Authentication Error',
          text: err.error.error.message,
        });
        console.log(err.error.error.message);
      }
    );
  }
}
