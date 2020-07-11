import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:UserModel;


  constructor() { }

  ngOnInit() {

    this.user = new UserModel();
    this.user.email = 'cedgo1997@gmail.com';
    
   }


   onSubmit(){
     console.log
     console.log(this.user)
   }


}
