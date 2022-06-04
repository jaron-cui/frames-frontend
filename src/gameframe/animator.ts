import {Entity} from "./Entity";

// input is in [0, 1] and represents the frame progress (ex. 3/10 frames would mean an input of 0.3)
// output is in [0, 1] and represents how far the animation should be progressed
export const instant = (t: number) => 1;
export const linear = (t: number) => t;
export const sin = (t: number) => (Math.sin(Math.PI * (t - 0.5)) + 1) / 2;
export const sinHalf2 = (t: number) => sin(t / 2 + .5);

type Animation = {
  from: number,
  to: number,
  frame: number,
  duration: number,
  easing: (t: number) => number
}

export default abstract class Animator {
  width: number;
  height: number;
  context: any;
  background: string;
  objects: Entity[];
  animations: {[id: number]: {[property: string]: Animation}};
  layers: Entity[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.context = null;
    this.background = "#FFFFFF";
    
    this.objects = [];
    this.animations = {};

    this.layers = [[]];
  }

  addEntity(object: Entity, layer?: number): number {
    this.objects.push(object);
    if (layer) {
      // TODO: add to specifiable layer
    }
    this.layers[0].push(object);
    return this.objects.length - 1;
  }

  clearFrame() {
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  draw(context: any) {
    this.context = context;
    
    this.clearFrame();
    this.drawBackground();
    this.layers.forEach(layer => {
      this.context.save();
      layer.forEach(object => object.draw(this.context));
      this.context.restore();
    });
  }

  tick() {
    const toResolve = [];
    Object.entries(this.animations).forEach(([id, objectAnimation]) => {
      for (const property in objectAnimation) {
        let animation = objectAnimation[property];
        animation.frame += 1;
        this.applyAnimation(id, property, animation);
        if (animation.frame === animation.duration) {
          toResolve.push([id, property]);
        }
      }
    })

    toResolve.forEach(identifier => {
      const id = identifier[0];
      const property = identifier[1];
      delete this.animations[id][property];
      if (Object.keys(this.animations[id]).length === 0) {
        delete this.animations[id];
      }
    });
  }
  
  private applyAnimation(id: any, property: string, animation: Animation) {
    let value;
    if (animation.frame === animation.duration) {
      value = animation.to;
    } else {
      const progress = animation.frame / animation.duration;
      const delta = animation.to - animation.from;
      value = animation.easing(progress) * delta + animation.from;
    }

    this.objects[id][property] = value;
  }

  drawBackground() {
    this.context.save();
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }
/*
  animateTo(id, property, to, duration, easing) {
    this._checkProperty(id, property);
    this.animateFromTo(id, property, this.objects[id][property], to, duration, easing);
  }
*/
  animateFromTo(id: number, property: string, initial: number, final: number, duration: number, easing) {
    this.checkProperty(id, property);
    this.animateProperty(id, property, initial, final, duration, easing)
  }
/*
  animateRelative(id, property, by, duration, easing) {
    this._checkProperty(id, property);
    let initial = this.objects[id][property];
    this.animateFromTo(id, property, initial, initial + by, duration, easing);
  }
*/
  private animateProperty(id: number, property, initial, final, duration, easing) {
    if (duration < 1) {
      throw Error("An animation must have a duration of at least 1 frame.");
    }

    if (!this.animations[id]) {
      this.animations[id] = {};
    }

    this.animations[id][property] = {
      from: initial,
      to: final,
      frame: 0,
      duration: duration,
      easing: easing
    };
  }

  private checkProperty(id, property) {
    if (!this.objects[id]) {
      throw Error("Cannot animate object that does not exist. ID: '" + id + "'.");
    }
    let current = this.objects[id][property];
    if (Number(current) !== current) {
      throw Error("Property '" + id + "." + property + "' cannot be animated: '" + current + "'.");
    }
  }

  abstract onTick(): void;

  abstract onLeftClick(): void;

  abstract onRightClick(): void;
}