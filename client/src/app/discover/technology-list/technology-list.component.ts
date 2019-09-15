import { Component, OnInit } from '@angular/core';

import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/model/technology.model';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.css']
})
export class TechnologyListComponent implements OnInit {
  technology : Technology[];

  constructor(private techservice : TechnologyService) { }

  ngOnInit() {
    this.technology = this.techservice.getTechnology();
  }

}
