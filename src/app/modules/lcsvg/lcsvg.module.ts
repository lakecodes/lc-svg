import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LcSvgComponent } from './lcsvg.component';
import { LcSvgGroupComponent } from './svg-g.component';
import { LcSvgService } from '../services/lc-svg.service';
import { ReturnKeysPipe } from './pipes/return-keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [LcSvgComponent, ReturnKeysPipe, LcSvgGroupComponent ],
  exports: [LcSvgComponent, LcSvgGroupComponent],
  providers: [LcSvgService]
})
export class LcSvgModule { }
