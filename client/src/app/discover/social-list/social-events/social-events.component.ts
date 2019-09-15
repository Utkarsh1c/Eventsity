import { Component, OnInit, Input } from '@angular/core';
import { Social } from 'src/app/model/social.model';

@Component({
  selector: 'app-social-events',
  templateUrl: './social-events.component.html',
  styleUrls: ['./social-events.component.css']
})
export class SocialEventsComponent implements OnInit {
  @Input() social : Social;
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}
