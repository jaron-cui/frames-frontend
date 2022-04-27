import { sin, sinHalf2 } from "../gameframe/animator";
import Game from "../gameframe/game";
import { ImageTexture } from "../gameframe/shape";

const boardOffset = {x:44,y:14};
const tileSize = 64;
const floatBy = 10;
export default class Chess extends Game {
  constructor(width, height) {
    super(width, height);
    this.boardImage = this.add(new ImageTexture(boardOffset.x, boardOffset.y, './chess/board.png', 1));
    this.board = [[], [this.newPiece('pawn', [0, 1])]];
    this.heldPiece = null;
  }

  newPiece(name, position) {
    let [visualX, visualY] = this.toVisualSpace(position);
    return this.add(new ImageTexture(visualX, visualY, './chess/piece/' + name + '.png', 2));
  }

  onTick() {
    console.log(this.mousePos);
  }

  onLeftClick() {
    let [x, y] = this.toBoardSpace(this.mousePos);
    console.log("clicked position (" + x + ", " + y +")");
    const piece = this.board[y] && this.board[y][x]
    if (piece) {
      this.heldPiece = piece;
      const floatY = this.toVisualSpace([x, y])[1] - floatBy;
      this.animateTo(piece, 'y', floatY, 10, sinHalf2);
    }
  }

  toBoardSpace(coordinates) {
    let x = Math.floor(((coordinates.x || coordinates[0]) - boardOffset.x) / tileSize);
    let y = 7 - Math.floor(((coordinates.y || coordinates[1]) - boardOffset.y) / tileSize);
    return [x, y];
  }

  toVisualSpace(coordinates) {
    let x = ((coordinates.x || coordinates[0]) + 7 / 64) * tileSize + boardOffset.x;
    let y = (7 - (coordinates.y || coordinates[1]) - 44 / 64) * tileSize + boardOffset.y;
    return [x, y];
  }
}