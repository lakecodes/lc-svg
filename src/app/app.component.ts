import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  config: any;

  constructor() {
    this.config = { layerscope: [0, 1, 2], click: [1], mouseover: [2], classscope: [1]/*, classes: ['btn']*/ };
  }

  ngOnInit() {
  }
  myClick(e) { console.log('Clicked', e); }
  myMouse(e) { console.log('Moused', e); }
}
