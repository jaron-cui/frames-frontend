import Animator from "./animator";

export default class Game {
  constructor(width, height) {
    this._animator = new Animator(width, height);
    this.mousePos = {x:0, y:0};
    this.mouseDown = false;
  }

  add(object) {
    return this._animator.addObject(object);
  }

  animateTo(target, property, value, duration, easing) {
    this._animator.animateTo(target, property, value, duration, easing);
  }

  animateBetween(target, property, from, to, duration, easing) {
    this._animator.animateFromTo(target, property, from, to, duration, easing);
  }

  draw(context) {
    this._animator.draw(context);
  }

  tick() {
    this.onTick();
    this._animator.tick();
  }

  onTick() {

  }

  onLeftClick() {
    
  }

  onRightClick() {

  }
}