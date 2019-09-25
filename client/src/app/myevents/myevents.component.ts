import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  uname:string;
  res:any;
  reg:any;
  discover : Discover[];
  public registered : [];

  constructor(private serverservice : ServerService,
              private discoverservice : DiscoverService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  this.uname=localStorage.getItem('name');
  this.ngxService.start();
  this.serverservice.getMyEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.event);
        this.discover = this.res.event;
        // console.log(this.res.event.id);
        this.discoverservice.setMyEvents(this.discover);
        this.ngxService.stop();
        // console.log(this.discover);
      },
      (error) =>{ 
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type:'error',
          title:'Oops...',
          text: 'Something Went Wrong',
          showConfirmButton:false,
          timer:1500,
        })
      },
      );

  this.serverservice.getRegisteredEvents()
  .subscribe(
    (response) =>{
      this.reg = response;
      console.log(this.reg.event);
      this.registered = this.reg.event;
      this.ngxService.stop();
      // console.log(this.res.event.id);
      // this.discoverservice.setRegisteredEvents(this.registered);
      // console.log(this.discover);
    },
    (error) =>{ 
      console.log(error);
      this.ngxService.stop();
      Swal.fire({
        type:'error',
        title:'Oops...',
        text: 'Something Went Wrong',
      })
    },
  )
  }
}


