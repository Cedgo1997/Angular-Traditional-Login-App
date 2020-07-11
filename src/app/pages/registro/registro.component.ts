import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  user: UserModel;
  remember=false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit(form: NgForm) {
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

    this.auth.signUp(this.user).subscribe(
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
