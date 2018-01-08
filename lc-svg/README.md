lc-svg <sub>*by LakeCodes*</sub>
===

SVG is a powerful markup language for creating interactive web graphics but the process of converting a beautiful graphic into a clickable floor plan, a map with hovered states, or another UI element, can be burdensome. If you ever thought, "There must be an easier way to integrate SVG into my Angular applications," this module is for you.
___

## <i class="icon-list-alt"></i> **Description**
LcSvg is an [Angular 2+](https://angular.io) Directive for displaying [Adobe Illustrator](http://www.adobe.com/products/illustrator/) SVG file data as an Angular directive, allowing developers to easily add click/hover/styling functionality to shape layers. This package uses [xml2js](https://www.npmjs.com/package/xml2js) by [leonidas](https://www.npmjs.com/~leonidas) to parse the Scalable Vector Graphic (SVG) XML to a Json object.
___
## <i class="icon-download"></i> **Installation**

Simplest way to install `lc-svg` is to use [npm](https://www.npmjs.com/package/lc-svg), just `npm install lc-svg` which will download **lc-svg** and all dependencies.
___
## <i class="icon-book"></i> **Usage**
Initial Setup:

```js
// in root Module or parent Module
// other imports
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; // if not using SSR
import { LcSvgModule } from 'lc-svg';

@NgModule({
  declarations: [...],
  imports: [
	// other modules
    HttpClientModule,
    HttpModule,
    LcSvgModule
  ],
  bootstrap: [...]
})
export class AppModule { }

```
SVG shape from XML:
```html
<lc-svg [url]="'/assets/svg/demo.svg'"></lc-svg>
```
```js
// angular imports etc.
import { LcSvgComponent } from 'lc-svg';

@Component({...})
export class AppComponent {
}
```

SVG shape from XML with configuration options:
```html
<lc-svg [url]="'/assets/svg/demo.svg'" [config]="config"></lc-svg>
```
```js
// angular imports etc.
import { LcSvgComponent, ILcSvgConfig } from 'lc-svg';

@Component({...})
export class AppComponent {
	config: ILcSvgConfig;
	
	constructor(){
		this.config = {
			layerscope: [0, 1, 4], // show layers 0, 1, and 4 only
			classscope: [1], // add class(es) for layer 1 only
			classes: ['btn'] // class(es) array to be added to layer 1
		};
	}
}
```

SVG shape from XML with mouse events:
```html
<lc-svg [url]="'/assets/svg/demo.svg'" [config]="config" (svgclick)="myClick($event)" (mouse)="myMouse($event)"></lc-svg>
```
```js
// angular imports etc.
import { LcSvgComponent, LcSvgService, ILcSvgConfig } from 'lc-svg';

@Component({...})
export class AppComponent {
	config: ILcSvgConfig;
	
	constructor(){
		this.config = {
			click: [1], // click event responds to layer 1 elements only
			mouseover: [3] // mouseover responds to layer 3 elements only
			classscope: [1], // add class(es) for layer 1 only
			classes: ['btn'] // class(es) array to be added to layer 1
		};
	}
	
  myClick(e) { console.log('Clicked', e); } // access element object and its attributes
  myMouse(e) { console.log('Moused', e); } // access element object and its attributes
}
```
##<i class="icon-cog"></i> **Configuration**
The optional `config` property is passed to display layers or add classes and/or mouse events to a specified (scoped) layer.
`layerscope` *[optional]* - determines which layers of svg file will be displayed (number array)
`click` *[optional]* - determines which layers' elements will listen for click events (number array)
`mouseover` *[optional]* - determines which layers' elements will listen for mouse events (number array)
`classscope` *[optional]* - determines which layers' elements will have `classes` applied (number array)
`classes` *[required when classscope exists]* - lists classes that will apply to `classscope` layer(s) (text array)
___
##<i class="icon-picture"></i> **SVG Setup**
SVG layers should be grouped into a main folder. As an example, we'll assume we have a background layer (graphics only), a content layer (that will accept click events and a custom class), and a foreground layer (containing text labels). The diagram below shows how the containing layers should be organized. For more predictable results when interacting with layers in your project, follow the suggested layer structure:

`+-- Main (data.svg)
|	+-- Background (data.svg[2].g)
	|	+-- [layers can continue to nest in any way if parent layer is not scoped]
|	+-- MyLayer (data.svg[1].g)
	|	+-- Mouse Event/Class Level [all objects or object/groups should be at this level when parent is scoped]
	|	+-- Mouse Event/Class Level
|	+-- Foreground (data.svg[0].g)
	|	+-- [layers may continue to nest if this layer is not scoped]`
> **Note:**
> - These layer organization and export practices should be considered in your SVG document but may not be required depending on the scope of your project.
> - **!!! .AI files *Saved As* SVG documents will not work !!!** Files must be exported as SVG. See steps below.

>####Adobe Illustrator Export Steps
> 1. <kbd>File</kbd> > <kbd>Export</kbd> > <kbd>Export As</kbd>
> 2. Select `SVG` from dropdown and check the `Use Artboards` checkbox
> 3. `Styling` = `Internal CSS`, `Font` = `SVG`, `Images` = `Link`, `Object IDs` = `Layer Names`, `Decimal` = `4`
> 4. `Minify` and `Responsive` should both be checked
> 5. Click `OK` to Save

___
###<i class="icon-file"></i> **License**
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
Copyright 2017 Lake County BCC

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.