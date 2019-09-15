import { Component, OnInit, Input } from '@angular/core';

import { Technology } from 'src/app/model/technology.model';

@Component({
  selector: 'app-technology-events',
  templateUrl: './technology-events.component.html',
  styleUrls: ['./technology-events.component.css']
})
export class TechnologyEventsComponent implements OnInit {
  @Input() technology : Technology[];
  @Input() index : number;

  constructor() { }

  ngOnInit() {
  }

}
