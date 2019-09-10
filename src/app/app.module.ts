import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverListComponent } from './discover/discover-list/discover-list.component';
import { DiscoverEventsComponent } from './discover/discover-list/discover-events/discover-events.component';
import { DiscoverDetailsComponent } from './discover/discover-details/discover-details.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DiscoverComponent,
    DiscoverListComponent,
    DiscoverEventsComponent,
    DiscoverDetailsComponent,
    DiscoverHomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
