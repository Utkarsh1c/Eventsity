import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private serverservice: ServerService) { }

  ngOnInit() {
  }

  getDiscover() {
    console.log('Fetch Events');
    this.serverservice.getCreatedEvents();
  }

}
