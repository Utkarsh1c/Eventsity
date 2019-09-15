import { Component, OnInit } from '@angular/core';

import { SocialService } from 'src/app/services/social.service';
import { Social } from 'src/app/model/social.model';

@Component({
  selector: 'app-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.css']
})
export class SocialListComponent implements OnInit {
  social : Social[];

  constructor(private socialservice : SocialService) { }

  ngOnInit() {
    this.social = this.socialservice.getSocial();
  }

}
