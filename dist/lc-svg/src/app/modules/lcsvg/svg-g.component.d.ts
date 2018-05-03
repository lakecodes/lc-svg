import { EventEmitter } from '@angular/core';
export declare class LcSvgGroupComponent {
    g: any;
    config: any;
    clickenable: any;
    mouseenable: any;
    cssenable: any;
    gExport: string;
    attr: string;
    isGroup: boolean;
    groupOpen: boolean;
    shapeClick: EventEmitter<{}>;
    shapeMouse: EventEmitter<{}>;
    click(e: any): void;
    mouse(e: any): void;
}
