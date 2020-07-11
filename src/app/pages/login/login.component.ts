import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  user:UserModel = new UserModel();

  ngOnInit() { 

  }


  login(form:NgForm) {

    if (form.invalid) {return;}
    

  }


}
