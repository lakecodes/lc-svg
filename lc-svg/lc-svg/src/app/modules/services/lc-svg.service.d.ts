import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
export declare class LcSvgService {
    private _http;
    constructor(_http: Http);
    getSvg(filepath: string): Observable<SVGAElement>;
    xml2Json(xml: any): any;
    private handleError(error);
}
