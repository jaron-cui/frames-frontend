const { toHaveDisplayValue } = require("@testing-library/jest-dom/dist/matchers");

const instant = t => 1;
const linear = t => t;
const sin = t => (Math.sin(Math.PI * (t - 0.5)) + 1) / 2

class Animator {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.context = null;
    this.background = "#FFFFFF";
    
    this.objects = {0: new Circle(0, 0, 10)};
    this.animations = {};

    this.layers = [[0]];

    this.animateRelative(0, "x", 300, 30, sin);
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


  stop() {
    this.running = false;
  }
}

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {

  }
}

class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y);
    this.radius = radius;
    this.color = color || "#000000";
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

export default Animator;