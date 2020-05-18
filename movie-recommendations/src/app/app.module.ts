import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemoMaterialModule} from './material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
   declarations: [
      AppComponent,
      routingComponents
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      DemoMaterialModule,
      HttpClientModule,
      NgxPaginationModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
