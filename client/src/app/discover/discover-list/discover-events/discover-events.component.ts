import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// import { Discover } from '../../discover.model';
import { Entertainment } from 'src/app/model/entertainment.model';
import { DiscoverListComponent } from '../discover-list.component';
import { Subject } from 'rxjs';
import { Discover } from '../../discover.model';

@Component({
  selector: 'app-discover-events',
  templateUrl: './discover-events.component.html',
  styleUrls: ['./discover-events.component.css']
})
export class DiscoverEventsComponent implements OnInit {
  // private destroyed : Subject = new Subject<void>();

  // constructor(list : DiscoverListComponent) {
  //   list.value$.pipe(takeUntil(this.destroyed)).subscribe((passent)=>{
  //     @Input() discover: Entertainment;
  //   })
  // }
  

  @Input() passent : boolean;
  @Input() discover: Discover;
  if(passent) {
    // @Input() discover:Entertainment;
    console.log('passent child');
  }
  @Input() index: number;

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   this.destroyed.next();
  // }
}
