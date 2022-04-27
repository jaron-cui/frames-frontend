const { Shape, Circle, ImageTexture } = require("./shape");

export const instant = t => 1;
export const linear = t => t;
export const sin = t => (Math.sin(Math.PI * (t - 0.5)) + 1) / 2;
export const sinHalf2 = t => sin(t / 2 + .5);

export default class Animator {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.context = null;
    this.background = "#FFFFFF";
    
    this.objectsCreated = 0;
    this.objects = {};//{0: new ImageTexture(0, 0, "./texture.png")};
    this.animations = {};

    this.layers = [[]];

    //this.animateRelative(0, "x", 300, 30, sin);
  }

  addObject(object, layer) {
    this.objects[this.objectsCreated] = object;
    if (layer) {
      // TODO: add to specifiable layer
    }
    this.layers[0].push(this.objectsCreated);
    return this.objectsCreated++;
  }

  clearFrame() {
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  draw(context) {
    this.context = context;
    
    this.clearFrame();
    this.drawBackground();
    this.layers.forEach(layer => {
      this.context.save();
      layer.forEach(id => this.objects[id].draw(this.context));
      this.context.restore();
    });
  }

  tick() {
    const toResolve = [];
    for (const id in this.animations) {
      let objectAnimation = this.animations[id];
      for (const property in objectAnimation) {
        let animation = objectAnimation[property];
        animation["t"] += 1;
        this._applyAnimation(id, property, animation);
        if (animation["t"] === animation["end"]) {
          toResolve.push([id, property]);
        }
      }
    }

    toResolve.forEach(identifier => {
      const id = identifier[0];
      const property = identifier[1];
      delete this.animations[id][property];
      if (Object.keys(this.animations[id]).length === 0) {
        delete this.animations[id];
      }
    });
  }
  
  _applyAnimation(id, property, animation) {
    let value;
    if (animation["t"] === animation["end"]) {
      value = animation["f"];
    } else {
      const progress = animation["t"] / animation["end"];
      const delta = animation["f"] - animation["i"];
      value = animation["ease"](progress) * delta + animation["i"];
    }

    this.objects[id][property] = value;
  }

  drawBackground() {
    this.context.save();
    this.context.fillStyle = this.background;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  animateTo(id, property, to, duration, easing) {
    this._checkProperty(id, property);
    this.animateFromTo(id, property, this.objects[id][property], to, duration, easing);
  }

  animateFromTo(id, property, initial, final, duration, easing) {
    this._checkProperty(id, property);
    this._animateProperty(id, property, initial, final, duration, easing)
  }

  animateRelative(id, property, by, duration, easing) {
    this._checkProperty(id, property);
    let initial = this.objects[id][property];
    this.animateFromTo(id, property, initial, initial + by, duration, easing);
  }

  _animateProperty(id, property, initial, final, duration, easing) {
    if (duration < 1) {
      throw Error("An animation must have a duration of at least 1 frame.");
    }
    if (!this.animations[id]) {
      this.animations[id] = {};
    }
    const animation = {"i": initial, "f": final, "t": 0, "end": duration, "ease": easing};
    this.animations[id][property] = animation;
  }

  _checkProperty(id, property) {
    if (!this.objects[id]) {
      throw Error("Cannot animate object that does not exist. ID: '" + id + "'.");
    }
    let current = this.objects[id][property];
    if (Number(current) !== current) {
      throw Error("Property '" + id + "." + property + "' cannot be animated: '" + current + "'.");
    }
  }
}