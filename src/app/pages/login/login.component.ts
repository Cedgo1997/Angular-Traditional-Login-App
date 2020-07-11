import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router:Router) {}

  user: UserModel = new UserModel();
  remember = false;



  ngOnInit() {

    if(localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.remember = true;
    }

  }

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

    if(this.remember) {
      localStorage.setItem('email', this.user.email);
    }

    this.router.navigateByUrl("/home");

    this.auth.logIn(this.user).subscribe(
      (userData) => {
        console.log(userData);
        Swal.close();
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          type: "error",
          title: "Authentication Error",
          text: err.error.error.message,
        });
      }
    );
  }
}
