import { Component, Input, OnInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { ReturnKeysPipe } from './pipes/return-keys.pipe';
import { LcSvgGroupComponent } from './svg-g.component';
import { ILcSvgConfig } from './lcsvg.interface';
import { LcSvgService } from '../services/lc-svg.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lc-svg',
    templateUrl: './lcsvg.component.html',
    providers: [LcSvgService]
})
export class LcSvgComponent implements OnInit {
    @Input() url;
    @Input() config: ILcSvgConfig;

    @Output() svgclick: EventEmitter<any> = new EventEmitter();
    @Output() mouse: EventEmitter<any> = new EventEmitter();
    svg: SVGAElement;
    errorMessage: String;
    constructor(private _svgService: LcSvgService) {}
    ngOnInit() {
        this._svgService.getSvg(this.url)
        .subscribe(data => this.svg = data,
        error => this.errorMessage = <any>error);
    }
    onShapeClick(e) { this.svgclick.emit(e); }
    onShapeMouse(e) { this.mouse.emit(e); }
}
