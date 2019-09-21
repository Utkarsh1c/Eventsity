import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tk :any;
  constructor(private serverservice : ServerService,
              private route: Router) { }

  ngOnInit() {
  }

  onLogin(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.logInUser(value.email,value.password)
    .subscribe(
      (response) => {
        console.log(response);
        this.tk = response ;
        localStorage.setItem('token', this.tk.token);
        this.route.navigate(['/']);
      },
      (error) => console.log(error),
    );
  }

}
