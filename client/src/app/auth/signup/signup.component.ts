import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  err:any;

  constructor(private serverservice : ServerService) { }

  ngOnInit() {
  }
  onSignup(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.signUpUser(value.name,value.email,value.password,value.cpassword)
    .subscribe(
      (response) => {
        console.log(response);
        alert('Successfully SignedUp now LogIn to continue');
        form.reset();
      },
      (error) => console.log(error),
        //  this.err = error.msg;
        //  console.log(this.err);

        // if(this.err==="E-mail address already exists")
        // {alert('E-mail address already exists');}

            
      );
  }
}
