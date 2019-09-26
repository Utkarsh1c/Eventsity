import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  t = false;
  s = false;
  constructor(private authservice : AuthService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if(this.s === false) {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 1500);
    this.s = true;
  }
    if(this.authservice.loggedIn()) {
      if(!this.t)
      setTimeout(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }, 21600000);
      this.t = true;
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
