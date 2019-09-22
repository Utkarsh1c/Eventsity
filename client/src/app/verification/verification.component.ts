import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  id:any;
  email=false;

  constructor(private serverservice: ServerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.params;
    console.log(this.id);
    // setTimeout(() => {
    //   this.email=true;
    // }, 120000);
  }
  
  Verify(form : NgForm) {
    const value = form.value;
    this.serverservice.verifyUser(value.otp, this.id)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}