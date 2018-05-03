import { OnInit, EventEmitter } from '@angular/core';
import { ILcSvgConfig } from './lcsvg.interface';
import { LcSvgService } from '../services/lc-svg.service';
export declare class LcSvgComponent implements OnInit {
    private _svgService;
    url: any;
    config: ILcSvgConfig;
    svgclick: EventEmitter<any>;
    mouse: EventEmitter<any>;
    svg: SVGAElement;
    errorMessage: String;
    constructor(_svgService: LcSvgService);
    ngOnInit(): void;
    onShapeClick(e: any): void;
    onShapeMouse(e: any): void;
}
