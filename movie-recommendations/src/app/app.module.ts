import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import {DemoMaterialModule} from './material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { RatingComponent } from './movie-info/rating/rating.component';
import { SimilarMovieComponent } from './movie-info/similar-movie/similar-movie.component';



@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      RatingComponent,
      SimilarMovieComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      DemoMaterialModule,
      HttpClientModule,
      NgxPaginationModule,
      FormsModule,
      NgbModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
