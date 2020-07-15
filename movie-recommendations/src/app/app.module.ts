import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import {DemoMaterialModule} from './material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

//ng-zorro
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US, NgZorroAntdModule} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

//Components
import { AppComponent } from './app.component';
import { RatingComponent } from './movie-info/rating/rating.component';
import { SimilarMovieComponent } from './movie-info/similar-movie/similar-movie.component';
import { MovieComponent } from './movie/movie.component';
import { MoviePopularComponent } from './movie/movie-popular/movie-popular.component';
import { MoviePopularAllComponent } from './movie/movie-popular/movie-popular-all/movie-popular-all.component';

registerLocaleData(en);


@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      RatingComponent,
      SimilarMovieComponent,
      MovieComponent,
      MoviePopularComponent,
      MoviePopularAllComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      DemoMaterialModule,
      HttpClientModule,
      NgxPaginationModule,
      FormsModule,
      NgbModule,
      NgZorroAntdModule,
      BrowserAnimationsModule
   ],
   providers: [{ provide: NZ_I18N, useValue: en_US }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
