import { Component, EventEmitter, Injectable, Input, NgModule, Output, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { parseString } from 'xml2js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
var LcSvgService = (function () {
    /**
     * @param {?} _http
     */
    function LcSvgService(_http) {
        this._http = _http;
    }
    /**
     * @param {?} filepath
     * @return {?}
     */
    LcSvgService.prototype.getSvg = function (filepath) {
        var _this = this;
        return this._http.get(filepath)
            .map(function (response) { return _this.xml2Json(response.text()); })
            .do(function (data) { return console.log(data); })
            .catch(this.handleError);
    };
    /**
     * @param {?} xml
     * @return {?}
     */
    LcSvgService.prototype.xml2Json = function (xml) {
        var /** @type {?} */ json;
        /**
         * @param {?} name
         * @return {?}
         */
        function attrPrefix(name) { return "@" + name; }
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
    };
    /**
     * @param {?} error
     * @return {?}
     */
    LcSvgService.prototype.handleError = function (error) {
        console.log('**ERROR** SVG Service ' + error);
        return Observable$1.throw(error.json().error || 'Server error');
    };
    return LcSvgService;
}());
LcSvgService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LcSvgService.ctorParameters = function () { return [
    { type: Http, },
]; };
var LcSvgComponent = (function () {
    /**
     * @param {?} _svgService
     */
    function LcSvgComponent(_svgService) {
        this._svgService = _svgService;
        this.svgclick = new EventEmitter();
        this.mouse = new EventEmitter();
    }
    /**
     * @return {?}
     */
    LcSvgComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._svgService.getSvg(this.url)
            .subscribe(function (data) { return _this.svg = data; }, function (error) { return _this.errorMessage = (error); });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    LcSvgComponent.prototype.onShapeClick = function (e) { this.svgclick.emit(e); };
    /**
     * @param {?} e
     * @return {?}
     */
    LcSvgComponent.prototype.onShapeMouse = function (e) { this.mouse.emit(e); };
    return LcSvgComponent;
}());
LcSvgComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lc-svg',
                template: "\n      <svg *ngIf=\"svg\" [attr.id]=\"svg.svg['@id']\" [attr.xmlns]=\"svg.svg['@xmlns']\" [attr.xmlns:xlink]=\"svg.svg['@xmlns:xlink']\" [attr.viewBox]=\"svg.svg['@viewBox']\"><!-- SVG -->\n          <svg:defs *ngIf=\"svg.svg.defs\"><!-- SVG Defs -->\n              <svg:style type=\"text/css\" *ngIf=\"svg.svg.defs.style\">{{svg.svg.defs.style}}</svg:style>\n              <svg:clipPath *ngIf=\"svg.svg.defs.clipPath\" [attr.id]=\"svg.svg.defs.clipPath['@id']\" [attr.g]=\"svg.svg.defs.clipPath\" lc-svg-g></svg:clipPath>\n          </svg:defs>\n          <title *ngIf=\"svg.svg.title\">{{svg.svg.title}}</title>\n          <ng-container *ngIf=\"!config || !config.layerscope\">\n              <svg:g *ngFor=\"let g of svg.svg.g; let i = index;\"\n                     [g]=\"g\"\n                     [config]=\"config\"\n                     [clickenable]=\"config && config.click ? config.click.indexOf(i) > -1 : false\"\n                     [mouseenable]=\"config && config.mouseover ? config.mouseover.indexOf(i) > -1 : false\"\n                     [cssenable]=\"config && config.classscope.length > -1 ? config.classscope.indexOf(i) > -1 : false\"\n                     [attr.id]=\"g['@id']\"\n                     [attr.class]=\"g['@class']\"\n                     [attr.style]=\"g['@style']\"\n                     [attr.transform]=\"g['@transform']\"\n                     (shapeClick)=\"onShapeClick($event)\"\n                     (shapeMouse)=\"onShapeMouse($event)\"\n                     lc-svg-g></svg:g><!-- SVG Shape Data -->\n          </ng-container>\n          <ng-container *ngIf=\"config && config.layerscope ? config.layerscope.length > 0 : false\">\n              <svg:g *ngFor=\"let i of config.layerscope\"\n                     [g]=\"svg.svg.g[i]\"\n                     [config]=\"config\"\n                     [clickenable]=\"config.click ? config.click.indexOf(i) > -1 : false\"\n                     [mouseenable]=\"config.mouseover ? config.mouseover.indexOf(i) > -1 : false\"\n                     [cssenable]=\"config.classscope.length > -1 ? config.classscope.indexOf(i) > -1 : false\"\n                     [attr.id]=\"svg.svg.g[i]['@id']\"\n                     [attr.class]=\"svg.svg.g[i]['@class']\"\n                     [attr.style]=\"svg.svg.g[i]['@style']\"\n                     [attr.transform]=\"svg.svg.g[i]['@transform']\"\n                     (shapeClick)=\"onShapeClick($event)\"\n                     (shapeMouse)=\"onShapeMouse($event)\"\n                     lc-svg-g></svg:g><!-- SVG Shape Data -->\n          </ng-container>\n      </svg>\n    ",
                providers: [LcSvgService]
            },] },
];
/**
 * @nocollapse
 */
LcSvgComponent.ctorParameters = function () { return [
    { type: LcSvgService, },
]; };
LcSvgComponent.propDecorators = {
    'url': [{ type: Input },],
    'config': [{ type: Input },],
    'svgclick': [{ type: Output },],
    'mouse': [{ type: Output },],
};
var LcSvgGroupComponent = (function () {
    function LcSvgGroupComponent() {
        this.gExport = '';
        this.attr = '';
        this.shapeClick = new EventEmitter();
        this.shapeMouse = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    LcSvgGroupComponent.prototype.click = function (e) { this.shapeClick.emit(e); };
    /**
     * @param {?} e
     * @return {?}
     */
    LcSvgGroupComponent.prototype.mouse = function (e) { this.shapeMouse.emit(e); };
    return LcSvgGroupComponent;
}());
LcSvgGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[lc-svg-g]',
                template: "\n    <ng-container *ngFor=\"let grp of (g?.length > 0 ? g : [g])\">\n      <ng-container *ngFor=\"let gkey of grp | returnKeys\">\n          <ng-container [ngSwitch]=\"gkey\">\n\n              <ng-container *ngSwitchCase=\"'circle'\"><!-- SVG Circle -->\n                  <svg:circle *ngFor=\"let c of (grp.circle?.length > 0 ? grp.circle : [grp.circle])\" [attr.id]=\"c['@id']\" [attr.data-name]=\"c['@data-name']\" [attr.class]=\"c['@class']\" [attr.cx]=\"c['@cx']\" [attr.cy]=\"c['@cy']\" [attr.r]=\"c['@r']\" [attr.transform]=\"c['@transform']\" [attr.style]=\"c['@style']\" />\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'ellipse'\"><!-- SVG Ellipse -->\n                  <svg:ellipse *ngFor=\"let e of (grp.ellipse?.length > 0 ? grp.ellipse : [grp.ellipse])\" [attr.id]=\"e['@id']\" [attr.data-name]=\"e['@data-name']\" [attr.class]=\"e['@class']\" [attr.cx]=\"e['@cx']\" [attr.cy]=\"e['@cy']\" [attr.rx]=\"e['@rx']\" [attr.ry]=\"e['@ry']\" [attr.transform]=\"e['@transform']\" [attr.style]=\"e['@style']\" />\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'line'\"><!-- SVG Line -->\n                  <svg:line *ngFor=\"let l of (grp.line?.length > 0 ? grp.line: [grp.line])\" [attr.id]=\"l['@id']\" [attr.class]=\"l['@class']\" [attr.x1]=\"l['@x1']\" [attr.x2]=\"l['@x2']\" [attr.y1]=\"l['@y1']\" [attr.y2]=\"l['@y2']\" [attr.stroke]=\"l['@stroke']\" [attr.stroke-width]=\"l['@stroke-width']\" [attr.transform]=\"l['@transform']\" [attr.style]=\"l['@style']\"></svg:line>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'path'\"><!-- SVG Path -->\n                  <svg:path *ngFor=\"let p of (grp.path?.length > 0 ? grp.path : [grp.path])\" [attr.id]=\"p['@id']\" [attr.data-name]=\"p['@data-name']\" [attr.class]=\"p['@class']\" [attr.d]=\"p['@d']\" [attr.stroke]=\"p['@stroke']\" [attr.stroke-width]=\"p['@stroke-width']\" [attr.fill]=\"p['@fill']\" [attr.style]=\"p['@style']\" />\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'polygon'\"><!-- SVG Polygon -->\n                  <svg:polygon *ngFor=\"let p of (grp.polygon?.length > 0 ? grp.polygon: [grp.polygon])\" [attr.id]=\"p['@id']\" [attr.class]=\"p['@class']\" [attr.points]=\"p['@points']\" [attr.stroke]=\"p['@stroke']\" [attr.stroke-width]=\"p['@stroke-width']\" [attr.fill]=\"p['@fill']\" [attr.transform]=\"p['@transform']\" [attr.style]=\"p['@style']\"></svg:polygon>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'polyline'\"><!-- SVG Line -->\n                  <svg:polyline *ngFor=\"let p of (grp.polyline?.length > 0 ? grp.polyline: [grp.polyline])\"\n                          [attr.id]=\"p['@id']\" [attr.class]=\"p['@class']\"\n                          [attr.points]=\"p['@points']\"\n                          [attr.stroke]=\"p['@stroke']\"\n                          [attr.stroke-width]=\"p['@stroke-width']\"\n                          [attr.fill]=\"p['@fill']\"\n                          [attr.transform]=\"p['@transform']\"\n                          [attr.style]=\"p['@style']\"></svg:polyline>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'rect'\"><!-- SVG Rect -->\n                  <svg:rect *ngFor=\"let r of (grp.rect?.length > 0 ? grp.rect : [grp.rect])\"\n                          [attr.id]=\"r['@id']\"\n                          [attr.data-name]=\"r['@data-name']\"\n                          [attr.class]=\"r['@class']\" [attr.x]=\"r['@x']\"\n                          [attr.y]=\"r['@y']\"\n                          [attr.rx]=\"r['@rx']\"\n                          [attr.ry]=\"r['@ry']\"\n                          [attr.width]=\"r['@width']\"\n                          [attr.height]=\"r['@height']\"\n                          [attr.style]=\"r['@style']\">\n                  </svg:rect>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'text'\"><!-- SVG Text -->\n                  <svg:text *ngFor=\"let t of (grp.text?.length > 0 ? grp.text : [grp.text])\"\n                          [attr.id]=\"t['@id']\"\n                          [attr.class]=\"t['@class']\"\n                          [attr.data-name]=\"t['@data-name']\"\n                          [attr.x]=\"t['@x']\"\n                          [attr.y]=\"t['@y']\"\n                          [attr.dx]=\"t['@dx']\"\n                          [attr.dy]=\"t['@dy']\"\n                          [attr.text-anchor]=\"t['@text-anchor']\"\n                          [attr.transform]=\"t['@transform']\"\n                          [attr.style]=\"t['@style']\">{{t['#text'] ? t['#text'] : t['_']}}\n                      <ng-container *ngIf=\"t.tspan\"><!-- SVG Tspan -->\n                          <svg:tspan *ngFor=\"let sp of (t.tspan?.length > 0 ? t.tspan : [t.tspan])\"\n                              [attr.id]=\"sp['@id']\"\n                              [attr.class]=\"sp['@class']\"\n                              [attr.x]=\"sp['@x']\"\n                              [attr.y]=\"sp['@y']\"\n                              [attr.dx]=\"sp['@dx']\"\n                              [attr.dy]=\"sp['@dy']\"\n                              [attr.rotate]=\"sp['@rotate']\"\n                              [attr.style]=\"sp['@style']\"\n                              [attr.xml:space]=\"sp['@xml:space']\">{{sp['#text'] ? sp['#text'] : sp['_']}}</svg:tspan>\n                      </ng-container>\n                  </svg:text>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'g'\"><!-- SVG Group -->\n                  <svg:g *ngFor=\"let g of (grp.g?.length > 0 ? grp.g : [grp.g]); let i = index;\"\n                         (click)=\"clickenable ? click($event) : null\"\n                         (mouseenter)=\"mouseenable ? mouse($event) : null\"\n                         [attr.id]=\"g['@id']\"\n                         [attr.class]=\"(config && cssenable) ? (g['@class'] ? config.classes.push(g['@class']) : config.classes) : g['@class']\"\n                         [attr.data-v]=\"i\"\n                         [g]=\"g\"\n                         lc-svg-g></svg:g>\n              </ng-container>\n\n          </ng-container>\n      </ng-container>\n    </ng-container>\n  "
            },] },
];
/**
 * @nocollapse
 */
LcSvgGroupComponent.ctorParameters = function () { return []; };
LcSvgGroupComponent.propDecorators = {
    'g': [{ type: Input },],
    'config': [{ type: Input },],
    'clickenable': [{ type: Input },],
    'mouseenable': [{ type: Input },],
    'cssenable': [{ type: Input },],
    'shapeClick': [{ type: Output },],
    'shapeMouse': [{ type: Output },],
};
var ReturnKeysPipe = (function () {
    function ReturnKeysPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ReturnKeysPipe.prototype.transform = function (value) {
        if (!value) {
            return [];
        }
        return Object.keys(value);
    };
    return ReturnKeysPipe;
}());
ReturnKeysPipe.decorators = [
    { type: Pipe, args: [{
                name: 'returnKeys'
            },] },
];
/**
 * @nocollapse
 */
ReturnKeysPipe.ctorParameters = function () { return []; };
var LcSvgModule = (function () {
    function LcSvgModule() {
    }
    return LcSvgModule;
}());
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
LcSvgModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { LcSvgModule, LcSvgComponent as ɵa, ReturnKeysPipe as ɵc, LcSvgGroupComponent as ɵd, LcSvgService as ɵb };
//# sourceMappingURL=lc-svg.es5.js.map
