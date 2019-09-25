import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  id:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService,
              private router : Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  sendEnquiry(form : NgForm) {
    const value = form.value;
    console.log(this.id);
    this.serverservice.sendenquiry(value.enquiry, this.id)
    .subscribe(
      (response) =>{
        console.log(response);
        Swal.fire({
          type: 'success',
          title: 'Enquiry Sent',
          showConfirmButton: false,
          timer: 2000,
        })
        this.router.navigate(['/']);
      },
      (error) => console.log(error),
    )
  }
}
