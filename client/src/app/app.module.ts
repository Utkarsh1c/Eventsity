import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverDetailsComponent } from './discover-details/discover-details.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ServerService } from './services/server.service';
import { DiscoverService } from './discover/discover.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DiscoverComponent,
    DiscoverDetailsComponent,
    DiscoverHomeComponent,
    FooterComponent,
    CreateComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    ContactusComponent,
    DropdownDirective,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ServerService, DiscoverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
