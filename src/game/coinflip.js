import { instant, sin } from "../gameframe/animator";
import Game from "../gameframe/game";
import { Circle, ImageTexture, Rectangle } from "../gameframe/shape";

export default class Coinflip extends Game {
  constructor(width, height) {
    super(width, height);
    this.coin = this.animator.addObject(new Rectangle(100, 100, 60, 60, "#55BBCC"));
    this.cursor = this.animator.addObject(new Circle(0, 0, 15, "#FF88AB"));
    this.down = false;
  }

  tick() {
    super.tick();
    this.animator.animateTo(this.cursor, "x", this.mousePos.x, 1, instant);
    this.animator.animateTo(this.cursor, "y", this.mousePos.y, 1, instant);
  }

  onLeftClick() {
    this.down = !this.down;
    this.animator.animateFromTo(this.coin, "height", this.down ? 60 : 0, this.down ? 0 : 60, 30, sin);
    this.animator.animateFromTo(this.coin, "y", this.down ? 100 : 130, this.down ? 130 : 100, 30, sin);
  }
}