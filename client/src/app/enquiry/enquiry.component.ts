import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  id:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  sendEnquiry(form : NgForm) {
    const value = form.value;
    console.log(this.id);
    this.serverservice.sendenquiry(value.enquiry, this.id)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    )
  }
}
