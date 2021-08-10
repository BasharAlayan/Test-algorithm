import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompareComponent} from './compare/compare.component';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {AllImagesComponent} from './all-images/all-images.component';
import {TestedComponent} from './tested/tested.component';
import {AllComponent} from './all/all.component';
import {ContactComponent} from './contact/contact.component';
import {AnalysisComponent} from './analysis/analysis.component';


const routes: Routes = [
  {path: 'detail/:id/:numero/:reverse', component: CompareComponent},
  {path: 'home', component: AllComponent},
  {path: 'about', component: AboutComponent},
  //{path: 'all', component: AllImagesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'tested', component: TestedComponent},
  {path: 'notTested', component: HomeComponent},
  {path: 'analyses', component: AnalysisComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
