import { Pitch } from '../Pitch';

export enum RabonaLayerType {
  Line = 'line',
  Circle = 'circle',
  BallMovement = 'ballMovement',
}

export type RabonaLayer = RabonaLayerType;
export type RabonaLineLayerOptions = {
  color: string;
  width: number;
  showArrows?: boolean;
  getLineColor?: (data) => string;
};

export type RabonaBallMovementOptions = RabonaLineLayerOptions & {
  radius?: number;
  getCircleColor?: (data) => string;
  getTextColor?: (data) => string;
  getWidth?: (data) => number;
};

export type RabonaCircleLayerOptions = RabonaLineLayerOptions & {
  radius: number;
  getCircleColor?: (data) => string;
  stroke?: string;
  strokeWidth?: number;
};

export type RabonaLayerOptions = RabonaLineLayerOptions | RabonaBallMovementOptions;

export type RabonaBallMovementData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  label: string;
};

export type RabonaLineLayerData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type RabonaCircleLayerData = {
  radius: number;
  startX: number;
  startY: number;
  label?: string;
};

export type RabonaData =
  | RabonaLineLayerData[]
  | RabonaCircleLayerData[]
  | RabonaBallMovementData[];

class Layer {
  public pitchToAdd?: Pitch;
  public id?: string;
  constructor(
    public type: RabonaLayer,
    public options: RabonaLayerOptions,
    public data: RabonaData,
  ) {
    // console.log(type, options, data);
  }

  addTo(pitch: Pitch) {
    pitch.addLayer(this);
    return this;
  }

  // @method remove: this
  // Removes the layer from the pitch it is currently active on.
  remove() {
    return this.removeFrom(this.pitchToAdd);
  }

  removeFrom(obj?: Pitch) {
    if (obj) {
      obj.removeLayer(this);
    }
    return this;
  }
}

export { Layer };

export type CreateLayerInputs = {
  type: RabonaLayer;
  options: RabonaLayerOptions;
  data: RabonaData;
};

export function createLayer({
  type,
  options,
  data,
}: {
  type: 'ballMovement';
  options: RabonaBallMovementOptions;
  data: RabonaBallMovementData[];
}): Layer;

export function createLayer({
  type,
  options,
  data,
}: {
  type: 'line';
  options: RabonaLineLayerOptions;
  data: RabonaLineLayerData[];
}): Layer;

export function createLayer({
  type,
  options,
  data,
}: {
  type: 'circle';
  options: RabonaCircleLayerOptions;
  data: RabonaCircleLayerData[];
}): Layer;

export function createLayer({ type, options, data }) {
  return new Layer(type, options, data);
}
