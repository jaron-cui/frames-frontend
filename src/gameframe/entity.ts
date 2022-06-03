import Animator, { sin } from "./animator";

export abstract class Entity {
  animator: Animator;
  id: number;

  constructor(animator: Animator, x=0, y=0) {
    this.animator = animator;
    this.id = this.animator.addEntity(this);
    this['x'] = x;
    this['y'] = y;
  }

  animateProperty(property: string, from: number, to: number, duration: number, easing: (t: number) => number) {
    if (this[property] === undefined) {
      throw Error(`Property '${property}' does not exist.`);
    }

    this.animator.animateFromTo(this.id, property, from, to, duration, easing);
  }

  animatePropertyChange(property: string, change: number, duration: number, easing: (t: number) => number) {
    if (this[property] === undefined) {
      throw Error(`Property '${property}' does not exist.`);
    }
    
    const value = this[property];
    this.animateProperty(property, value, value + change, duration, easing);
  }

  moveTo(x: number, y: number, duration?: number, easing?: (t: number) => number) {
    if (duration === undefined) {
      this['x'] = x;
      this['y'] = y;
    } else {
      if (easing === undefined) {
        easing = sin;
      }
      this.animateProperty('x', this['x'], x, duration, easing);
      this.animateProperty('y', this['y'], y, duration, easing);
    }
  }

  moveBy(dx: number, dy: number, duration?: number, easing?: (t: number) => number) {
    this.moveTo(this['x'] + dx, this['y'] + dy, duration, easing);
  }

  abstract draw(context: any): void;
}

export class ImageEntity extends Entity {
  image: HTMLImageElement;
  constructor(x: number, y: number, path: string, animator: Animator) {
    super(animator, x, y);
    this.image = new Image();
    this.image.src = path;
  }

  draw(context: any) {
    //const scale = "" + this.scale * 100 + "%";
    context.drawImage(this.image, this['x'], this['y']);
  }
}