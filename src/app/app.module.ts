import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LcSvgModule } from './modules/lcsvg/lcsvg.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LcSvgModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
