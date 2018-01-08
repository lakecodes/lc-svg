import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'g[lc-svg-g]',
  templateUrl: './svg-g.component.html'
})
export class LcSvgGroupComponent {
  @Input() g;
  @Input() config;
  @Input() clickenable;
  @Input() mouseenable;
  @Input() cssenable;

  gExport = '';
  attr = '';
  isGroup: boolean;
  groupOpen: boolean;

  @Output() shapeClick = new EventEmitter();
  @Output() shapeMouse = new EventEmitter();

  click(e) { this.shapeClick.emit(e); }
  mouse(e) { this.shapeMouse.emit(e); }

}
