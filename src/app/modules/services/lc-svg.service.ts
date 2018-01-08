import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { parseString } from 'xml2js';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class LcSvgService {
    constructor(private _http: Http) { }

    // Get SVG Data
    getSvg(filepath: string): Observable<SVGAElement> {
        return this._http.get(filepath)
            // get response as text because they have not given us a valid JSON response.
            .map((response: Response) => this.xml2Json(response.text()))
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    // XML Parser
    xml2Json(xml) {
      let json;
      function attrPrefix(name) { return `@${name}`; }
      parseString(xml, {
          explicitChildren : false,
          explicitArray : false,
          explicitRoot : true,
          mergeAttrs : true,
          trim : true,
          attrNameProcessors : [attrPrefix]
        },
        function(err, result) {
          json = result;
        });
        return json;
      }

    // Error Handling
    private handleError(error: Response) {
        console.log('**ERROR** SVG Service ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
