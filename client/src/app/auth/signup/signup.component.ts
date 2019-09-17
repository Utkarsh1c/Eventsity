import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit() {
  }
  onSignup(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.authservice.signUpUser(value.name,value.email,value.password)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    );
    form.reset();
  }
}
