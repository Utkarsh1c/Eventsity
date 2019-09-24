import { Component, OnInit } from '@angular/core';
import { DiscoverService } from '../discover/discover.service';
import { NgForm } from '@angular/forms';
import { Discover } from '../discover/discover.model';
// import { EntertainmentService } from '../services/entertainment.service';
// import { SportsService } from '../services/sports.service';
// import { SocialService } from '../services/social.service';
// import { TechnologyService } from '../services/technology.service';
// import { Entertainment } from '../model/entertainment.model';
// import { Sports } from '../model/sports.model';
// import { Social } from '../model/social.model';
// import { Technology } from '../model/technology.model';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  enttype=false;
  sportstype=false;
  socialtype=false;
  techtype=false;
  errormsg:string;


  constructor(private dservice : DiscoverService,
              // private entservice : EntertainmentService,
              // private sportsservice : SportsService,
              // private socialservice : SocialService,
              // private techservice : TechnologyService,
              private router : Router,
              private serverservice : ServerService) { }

  ngOnInit() {
  }

  // onAddToEntertainment() {
  //   this.enttype = true;
  //   this.sportstype=false;
  //   this.socialtype=false;
  //   this.techtype=false;
  //   console.log('Enter to enttype true');
  // }

  // onAddToSports() {
  //   this.sportstype = true;
  //   this.enttype=false;
  //   this.socialtype=false;
  //   this.techtype=false;
  //   console.log('Enter to sportstype true');
  // }
  
  // onAddToSocial() {
  //   this.socialtype = true;
  //   this.enttype=false;
  //   this.sportstype=false;
  //   this.techtype=false;
  //   console.log('Enter to socialtype true');
  // }  

  // onAddToTechnology() {
  //   this.techtype = true;
  //   this.enttype=false;
  //   this.sportstype=false;
  //   this.socialtype=false;
  //   console.log('Enter to techtype true');
  // }

  onCreate(form : NgForm) {
    console.log('Entered Create');
    const value = form.value;
    // const newDiscover = new Discover(value.ename, value.category, value.evenue, value.fevenue, value.imagePath, 
    //   value.date);
    //   console.log(value);
    // this.dservice.adddiscover(newDiscover);
    this.serverservice.createEvent(value.ename, value.category, value.evenue, value.fevenue, value.imagePath, 
      value.date, value.orgname, value.description)
      .subscribe(
        (response) =>{ 
          console.log(response);
          this.router.navigate(['/discover']);
        },
        (error:HttpErrorResponse) =>{ 
          // console.log(error.error.message);
          this.errormsg = error.error.message;
          alert(this.errormsg);
        },
      );
    // form.reset();
    
  }
  onCancel() {
    this.router.navigate(['/discover']);
  }
}