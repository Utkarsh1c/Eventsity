import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(private serverservice: ServerService) { }

  ngOnInit() {
  }
  Verify(form : NgForm) {
    const value = form.value;
    this.serverservice.verifyUser(value.otp)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
