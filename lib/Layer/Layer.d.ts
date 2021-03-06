import { Pitch } from '../Pitch';
export declare type RabonaLayer = 'line' | 'circle' | 'passLayer';
export declare type RabonaLayerOptions = {
    color: string;
    width: number;
};
export declare type RabonaPassLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
export declare type RabonaLineLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
export declare type RabonaCircleLayerData = {
    radius: number;
    cx: number;
    cy: number;
};
export declare type RabonaData = RabonaLineLayerData[] | RabonaCircleLayerData[] | RabonaPassLayerData[];
declare class Layer {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaData;
    pitchToAdd?: Pitch;
    id?: string;
    constructor(type: RabonaLayer, options: RabonaLayerOptions, data: RabonaData);
    addTo(pitch: Pitch): this;
    remove(): this;
    removeFrom(obj?: Pitch): this;
}
export { Layer };
export declare type CreateLayerInputs = {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaData;
};
export declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;
