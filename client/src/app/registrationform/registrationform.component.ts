import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  id:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  register(form : NgForm) {
    const value = form.value;
    console.log(this.id);
    this.serverservice.register(value.name, value.email, this.id)
    .subscribe(
      (response) =>{
        console.log(response),
        Swal.fire({
          type: 'success',
          title: 'Successfully Registered',
          showConfirmButton: false,
          timer: 2000,
        })
      },
      (error) =>{
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Not LoggedIn',
        })
      }
    )
  }

}
