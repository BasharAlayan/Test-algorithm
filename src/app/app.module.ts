import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AllImagesComponent } from './all-images/all-images.component';
import { TestedComponent } from './tested/tested.component';
import { AllComponent } from './all/all.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    CompareComponent,
    AboutComponent,
    HomeComponent,
    AllImagesComponent,
    TestedComponent,
    AllComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
