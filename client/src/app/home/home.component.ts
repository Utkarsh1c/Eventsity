import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit() {
    if(this.authservice.loggedIn()) {
      setTimeout(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }, 7200000);
    }

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then(function() {
    //   Swal.fire(
    //     'Deleted!',
    //     'Your file has been deleted.',
    //     'success'
    //   );
    // })

    // Swal.fire({
    //   type: 'success',
    //   title: 'Welcome to EventSity',
    //   showConfirmButton: false,
    //   timer: 2000,
    // })

  }

}
