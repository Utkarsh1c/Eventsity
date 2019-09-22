import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  id:any;
  resend=false;

  constructor(private serverservice: ServerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    setTimeout(() => {
      this.resend=true;
    }, 120000);
  }

  onResend() {
    this.resend = false;
    setTimeout(() => {
      this.resend = true;
    }, 120000);
    this.serverservice.resendOtp(this.id)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    );
  }
  
  Verify(form : NgForm) {
    const value = form.value;
    console.log(this.id);
    this.serverservice.verifyUser(value.otp, this.id)
    .subscribe(
      (response) =>{ 
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    );
  }
}