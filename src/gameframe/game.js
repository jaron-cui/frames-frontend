import Animator from "./animator";


export default class Game {
  constructor(width, height) {
    this.animator = new Animator(width, height);
    this.mousePos = {x:0, y:0};
    this.mouseDown = false;
  }

  draw(context) {
    this.animator.draw(context);
  }

  tick() {
    this.animator.tick();
  }

  onLeftClick() {

  }

  onRightClick() {
    
  }
}