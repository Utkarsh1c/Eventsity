import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serverservice : ServerService) { }

  ngOnInit() {
  }

  onLogin(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.logInUser(value.email,value.password)
    .subscribe(
      (response) => {
        console.log(response),
        localStorage.setItem('token', response.token)
        alert("Successfully Logged In");
      },
      (error) => {
        console.log(error),
        alert("Invalid Inputs. LogIn Again");
      },
    );
    form.reset();
  }

}
