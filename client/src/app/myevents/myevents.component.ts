import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Discover } from '../discover/discover.model';
import { DiscoverService } from '../discover/discover.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  uname:string;
  res:any;
  reg:any;
  ereg:any;
  discover : Discover[];
  public registered : [];
  public earlierregistered : [];
  i:number;
  j:number;
  id:number;
  eventarray:number[]=[];

  constructor(private serverservice : ServerService,
              private discoverservice : DiscoverService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

  ngOnInit() {
  this.uname=localStorage.getItem('name');

  this.ngxService.start();

  this.router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
        return;
    }
    window.scrollTo(0, 0);
  });

  this.serverservice.getMyEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.event);
        this.discover = this.res.event;
        for(this.i=0; this.i<this.discover.length; this.i++) {
          this.id = this.discover[this.i].id;
          console.log(this.id);
          for(this.j=this.i; this.j<this.i+1; this.j++) {
            this.eventarray.push(this.id);
            console.log(this.eventarray)
          }
        }
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
      // console.log(this.reg.event);
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

  this.serverservice.getEarlierRegisteredEvents()
  .subscribe(
    (response) =>{
      this.ereg = response;
      // console.log(this.reg.event);
      this.earlierregistered = this.ereg.event;
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

  onDelete(eventid:any) {
    this.ngxService.start();
    console.log(eventid);
    this.serverservice.deleteEvent(eventid)
    .subscribe(
      (response) =>{
        console.log(response);
        this.ngxService.stop();
        Swal.fire({
          type:'success',
          title: 'Event Deleted',
          showConfirmButton: false,
          timer: 1000,
        })
        this.router.navigate(['/discover']);
      },
      (error) =>{
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Not Authenticated To Delete',
          showConfirmButton: false,
          timer: 1500,
        })
      },
    )
  }

}