import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DiscoverService } from 'src/app/discover/discover.service';
import Swal from 'sweetalert2';

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
              ) { }

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
        localStorage.setItem('token', this.tk.token);
        localStorage.setItem('name',this.name.name);
        Swal.fire({
          type: 'success',
          title: 'LoggedIn',
          text: 'Successfully LoggedIn',
          showConfirmButton:false,
          timer : 2000,
        })
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
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: this.errormsg,
        })
      },
    );
  }

}