import { Component, OnInit } from '@angular/core';
import { Discover } from '../discover.model';

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.css']
})
export class DiscoverListComponent implements OnInit {
  discover : Discover[] = [
    new Discover('Marathon', 'RDC', 'assets/images/marathon.jpg'),
    new Discover('EDM Night','AKG','assets/images/edm.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
