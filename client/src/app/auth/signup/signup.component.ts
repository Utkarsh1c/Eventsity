import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  err:any;
  errorMsg:string;
  uid:any;

  constructor(private serverservice : ServerService,
              private route : Router) { }

  ngOnInit() {
  }
  onSignup(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.signUpUser(value.name,value.email,value.password,value.cpassword)
    .subscribe(
      (response) => {
        this.uid = response;
        // console.log(this.uid.userId);
        this.route.navigate(['/verify',this.uid.userId]);
        form.reset();
      },
      (error: HttpErrorResponse) =>{
        console.log(error)
        this.errorMsg = error.error.data[0].msg;
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: this.errorMsg,
        })
      },
      );
  }
}
