import { Component, EventEmitter, Injectable, Input, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { parseString } from 'xml2js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

class LcSvgService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
    }
    /**
     * @param {?} filepath
     * @return {?}
     */
    getSvg(filepath) {
        return this._http.get(filepath)
            .map((response) => this.xml2Json(response.text()))
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    /**
     * @param {?} xml
     * @return {?}
     */
    xml2Json(xml) {
        let /** @type {?} */ json;
        /**
         * @param {?} name
         * @return {?}
         */
        function attrPrefix(name) { return `@${name}`; }
        parseString(xml, {
            explicitChildren: false,
            explicitArray: false,
            explicitRoot: true,
            mergeAttrs: true,
            trim: true,
            attrNameProcessors: [attrPrefix]
        }, function (err, result) {
            json = result;
        });
        return json;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        console.log('**ERROR** SVG Service ' + error);
        return Observable$1.throw(error.json().error || 'Server error');
    }
}
LcSvgService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LcSvgService.ctorParameters = () => [
    { type: Http, },
];

class LcSvgComponent {
    /**
     * @param {?} _svgService
     */
    constructor(_svgService) {
        this._svgService = _svgService;
        this.svgclick = new EventEmitter();
        this.mouse = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._svgService.getSvg(this.url)
            .subscribe(data => this.svg = data, error => this.errorMessage = (error));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onShapeClick(e) { this.svgclick.emit(e); }
    /**
     * @param {?} e
     * @return {?}
     */
    onShapeMouse(e) { this.mouse.emit(e); }
}
LcSvgComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lc-svg',
                template: `
      <svg *ngIf="svg" [attr.id]="svg.svg['@id']" [attr.xmlns]="svg.svg['@xmlns']" [attr.xmlns:xlink]="svg.svg['@xmlns:xlink']" [attr.viewBox]="svg.svg['@viewBox']"><!-- SVG -->
          <svg:defs *ngIf="svg.svg.defs"><!-- SVG Defs -->
              <svg:style type="text/css" *ngIf="svg.svg.defs.style">{{svg.svg.defs.style}}</svg:style>
              <svg:clipPath *ngIf="svg.svg.defs.clipPath" [attr.id]="svg.svg.defs.clipPath['@id']" [attr.g]="svg.svg.defs.clipPath" lc-svg-g></svg:clipPath>
          </svg:defs>
          <title *ngIf="svg.svg.title">{{svg.svg.title}}</title>
          <ng-container *ngIf="!config || !config.layerscope">
              <svg:g *ngFor="let g of svg.svg.g; let i = index;"
                     [g]="g"
                     [config]="config"
                     [clickenable]="config && config.click ? config.click.indexOf(i) > -1 : false"
                     [mouseenable]="config && config.mouseover ? config.mouseover.indexOf(i) > -1 : false"
                     [cssenable]="config && config.classscope.length > -1 ? config.classscope.indexOf(i) > -1 : false"
                     [attr.id]="g['@id']"
                     [attr.class]="g['@class']"
                     [attr.style]="g['@style']"
                     [attr.transform]="g['@transform']"
                     (shapeClick)="onShapeClick($event)"
                     (shapeMouse)="onShapeMouse($event)"
                     lc-svg-g></svg:g><!-- SVG Shape Data -->
          </ng-container>
          <ng-container *ngIf="config && config.layerscope ? config.layerscope.length > 0 : false">
              <svg:g *ngFor="let i of config.layerscope"
                     [g]="svg.svg.g[i]"
                     [config]="config"
                     [clickenable]="config.click ? config.click.indexOf(i) > -1 : false"
                     [mouseenable]="config.mouseover ? config.mouseover.indexOf(i) > -1 : false"
                     [cssenable]="config.classscope.length > -1 ? config.classscope.indexOf(i) > -1 : false"
                     [attr.id]="svg.svg.g[i]['@id']"
                     [attr.class]="svg.svg.g[i]['@class']"
                     [attr.style]="svg.svg.g[i]['@style']"
                     [attr.transform]="svg.svg.g[i]['@transform']"
                     (shapeClick)="onShapeClick($event)"
                     (shapeMouse)="onShapeMouse($event)"
                     lc-svg-g></svg:g><!-- SVG Shape Data -->
          </ng-container>
      </svg>
    `,
                providers: [LcSvgService]
            },] },
];
/**
 * @nocollapse
 */
LcSvgComponent.ctorParameters = () => [
    { type: LcSvgService, },
];
LcSvgComponent.propDecorators = {
    'url': [{ type: Input },],
    'config': [{ type: Input },],
    'svgclick': [{ type: Output },],
    'mouse': [{ type: Output },],
};

class LcSvgGroupComponent {
    constructor() {
        this.gExport = '';
        this.attr = '';
        this.shapeClick = new EventEmitter();
        this.shapeMouse = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    click(e) { this.shapeClick.emit(e); }
    /**
     * @param {?} e
     * @return {?}
     */
    mouse(e) { this.shapeMouse.emit(e); }
}
LcSvgGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[lc-svg-g]',
                template: `
    <ng-container *ngFor="let grp of (g?.length > 0 ? g : [g])">
      <ng-container *ngFor="let gkey of grp | returnKeys">
          <ng-container [ngSwitch]="gkey">

              <ng-container *ngSwitchCase="'circle'"><!-- SVG Circle -->
                  <svg:circle *ngFor="let c of (grp.circle?.length > 0 ? grp.circle : [grp.circle])" [attr.id]="c['@id']" [attr.data-name]="c['@data-name']" [attr.class]="c['@class']" [attr.cx]="c['@cx']" [attr.cy]="c['@cy']" [attr.r]="c['@r']" [attr.transform]="c['@transform']" [attr.style]="c['@style']" />
              </ng-container>

              <ng-container *ngSwitchCase="'ellipse'"><!-- SVG Ellipse -->
                  <svg:ellipse *ngFor="let e of (grp.ellipse?.length > 0 ? grp.ellipse : [grp.ellipse])" [attr.id]="e['@id']" [attr.data-name]="e['@data-name']" [attr.class]="e['@class']" [attr.cx]="e['@cx']" [attr.cy]="e['@cy']" [attr.rx]="e['@rx']" [attr.ry]="e['@ry']" [attr.transform]="e['@transform']" [attr.style]="e['@style']" />
              </ng-container>

              <ng-container *ngSwitchCase="'line'"><!-- SVG Line -->
                  <svg:line *ngFor="let l of (grp.line?.length > 0 ? grp.line: [grp.line])" [attr.id]="l['@id']" [attr.class]="l['@class']" [attr.x1]="l['@x1']" [attr.x2]="l['@x2']" [attr.y1]="l['@y1']" [attr.y2]="l['@y2']" [attr.stroke]="l['@stroke']" [attr.stroke-width]="l['@stroke-width']" [attr.transform]="l['@transform']" [attr.style]="l['@style']"></svg:line>
              </ng-container>

              <ng-container *ngSwitchCase="'path'"><!-- SVG Path -->
                  <svg:path *ngFor="let p of (grp.path?.length > 0 ? grp.path : [grp.path])" [attr.id]="p['@id']" [attr.data-name]="p['@data-name']" [attr.class]="p['@class']" [attr.d]="p['@d']" [attr.stroke]="p['@stroke']" [attr.stroke-width]="p['@stroke-width']" [attr.fill]="p['@fill']" [attr.style]="p['@style']" />
              </ng-container>

              <ng-container *ngSwitchCase="'polygon'"><!-- SVG Polygon -->
                  <svg:polygon *ngFor="let p of (grp.polygon?.length > 0 ? grp.polygon: [grp.polygon])" [attr.id]="p['@id']" [attr.class]="p['@class']" [attr.points]="p['@points']" [attr.stroke]="p['@stroke']" [attr.stroke-width]="p['@stroke-width']" [attr.fill]="p['@fill']" [attr.transform]="p['@transform']" [attr.style]="p['@style']"></svg:polygon>
              </ng-container>

              <ng-container *ngSwitchCase="'polyline'"><!-- SVG Line -->
                  <svg:polyline *ngFor="let p of (grp.polyline?.length > 0 ? grp.polyline: [grp.polyline])"
                          [attr.id]="p['@id']" [attr.class]="p['@class']"
                          [attr.points]="p['@points']"
                          [attr.stroke]="p['@stroke']"
                          [attr.stroke-width]="p['@stroke-width']"
                          [attr.fill]="p['@fill']"
                          [attr.transform]="p['@transform']"
                          [attr.style]="p['@style']"></svg:polyline>
              </ng-container>

              <ng-container *ngSwitchCase="'rect'"><!-- SVG Rect -->
                  <svg:rect *ngFor="let r of (grp.rect?.length > 0 ? grp.rect : [grp.rect])"
                          [attr.id]="r['@id']"
                          [attr.data-name]="r['@data-name']"
                          [attr.class]="r['@class']" [attr.x]="r['@x']"
                          [attr.y]="r['@y']"
                          [attr.rx]="r['@rx']"
                          [attr.ry]="r['@ry']"
                          [attr.width]="r['@width']"
                          [attr.height]="r['@height']"
                          [attr.style]="r['@style']">
                  </svg:rect>
              </ng-container>

              <ng-container *ngSwitchCase="'text'"><!-- SVG Text -->
                  <svg:text *ngFor="let t of (grp.text?.length > 0 ? grp.text : [grp.text])"
                          [attr.id]="t['@id']"
                          [attr.class]="t['@class']"
                          [attr.data-name]="t['@data-name']"
                          [attr.x]="t['@x']"
                          [attr.y]="t['@y']"
                          [attr.dx]="t['@dx']"
                          [attr.dy]="t['@dy']"
                          [attr.text-anchor]="t['@text-anchor']"
                          [attr.transform]="t['@transform']"
                          [attr.style]="t['@style']">{{t['#text'] ? t['#text'] : t['_']}}
                      <ng-container *ngIf="t.tspan"><!-- SVG Tspan -->
                          <svg:tspan *ngFor="let sp of (t.tspan?.length > 0 ? t.tspan : [t.tspan])"
                              [attr.id]="sp['@id']"
                              [attr.class]="sp['@class']"
                              [attr.x]="sp['@x']"
                              [attr.y]="sp['@y']"
                              [attr.dx]="sp['@dx']"
                              [attr.dy]="sp['@dy']"
                              [attr.rotate]="sp['@rotate']"
                              [attr.style]="sp['@style']"
                              [attr.xml:space]="sp['@xml:space']">{{sp['#text'] ? sp['#text'] : sp['_']}}</svg:tspan>
                      </ng-container>
                  </svg:text>
              </ng-container>

              <ng-container *ngSwitchCase="'g'"><!-- SVG Group -->
                  <svg:g *ngFor="let g of (grp.g?.length > 0 ? grp.g : [grp.g]); let i = index;"
                         (click)="clickenable ? click($event) : null"
                         (mouseenter)="mouseenable ? mouse($event) : null"
                         [attr.id]="g['@id']"
                         [attr.class]="(config && cssenable) ? (g['@class'] ? config.classes.push(g['@class']) : config.classes) : g['@class']"
                         [attr.data-v]="i"
                         [g]="g"
                         lc-svg-g></svg:g>
              </ng-container>

          </ng-container>
      </ng-container>
    </ng-container>
  `
            },] },
];
/**
 * @nocollapse
 */
LcSvgGroupComponent.ctorParameters = () => [];
LcSvgGroupComponent.propDecorators = {
    'g': [{ type: Input },],
    'config': [{ type: Input },],
    'clickenable': [{ type: Input },],
    'mouseenable': [{ type: Input },],
    'cssenable': [{ type: Input },],
    'shapeClick': [{ type: Output },],
    'shapeMouse': [{ type: Output },],
};

class ReturnKeysPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        if (!value) {
            return [];
        }
        return Object.keys(value);
    }
}
ReturnKeysPipe.decorators = [
    { type: Pipe, args: [{
                name: 'returnKeys'
            },] },
];
/**
 * @nocollapse
 */
ReturnKeysPipe.ctorParameters = () => [];

class LcSvgModule {
}
LcSvgModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BrowserModule
                ],
                declarations: [LcSvgComponent, ReturnKeysPipe, LcSvgGroupComponent],
                exports: [LcSvgComponent, LcSvgGroupComponent],
                providers: [LcSvgService]
            },] },
];
/**
 * @nocollapse
 */
LcSvgModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { LcSvgModule, LcSvgComponent as ɵa, ReturnKeysPipe as ɵc, LcSvgGroupComponent as ɵd, LcSvgService as ɵb };
//# sourceMappingURL=lc-svg.js.map
