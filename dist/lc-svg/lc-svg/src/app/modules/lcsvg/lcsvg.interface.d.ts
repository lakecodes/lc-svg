export interface ILcSvgSettings {
    json: any;
    type?: ('shape' | 'data');
    groupSel?: Array<number>;
    customSel?: Array<number>;
    ngClass?: (Object | Array<string>);
}
export interface ILcSvgConfig {
    layerscope?: Array<number>;
    click?: Array<number> | boolean;
    mouseover?: Array<number> | boolean;
    classscope?: Array<number>;
    classes?: any;
}
