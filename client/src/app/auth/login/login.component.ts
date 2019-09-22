import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DiscoverService } from 'src/app/discover/discover.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tk :any;
  errormsg:string;
  uid:any;
  name:any;
  constructor(private serverservice : ServerService,
              private route: Router,
              private discoverservice : DiscoverService) { }

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
        this.name = response;
        // console.log(this.name.name);
        this.discoverservice.transferUsername(this.name.name);
        localStorage.setItem('token', this.tk.token);
        this.route.navigate(['/']);
      },
      (error: HttpErrorResponse) =>{
        console.log(error)
        this.errormsg = error.error.message;
        if(this.errormsg === "User is not verified") {
          this.uid = error.error;
          console.log(this.uid.userId);
          this.route.navigate(['/verify',this.uid.userId])
        }
        alert(this.errormsg || "Server Error");
      },
    );
  }

}
