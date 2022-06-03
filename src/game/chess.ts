import Animator, { sinHalf2 } from "../gameframe/animator";
import { ImageEntity } from "../gameframe/Entity";
import boardTexture from '../resource/chess/board.png';
import pawnTexture from '../resource/chess/piece/pawn.png'

const boardOffset = {x:44,y:14};
const tileSize = 64;
const floatBy = 10;
export default class Chess extends Animator {
  boardImage: ImageEntity;
  board: ImageEntity[][];
  heldPiece: any;

  constructor(width, height) {
    super(width, height);
    this.boardImage = new ImageEntity(boardOffset.x, boardOffset.y, boardTexture, this);
    this.board = [[], [this.newPiece('pawn', [0, 1])]];
    this.heldPiece = null;
  }

  newPiece(name: string, position) {
    let [visualX, visualY] = this.toVisualSpace(position);
    return new ImageEntity(visualX, visualY, pawnTexture, this);
  }

  onTick() {
    
  }

  onLeftClick() {
    let [x, y] = this.toBoardSpace(this['mousePosition']);
    console.log("clicked position (" + x + ", " + y +")");
    const piece = this.board[y][x]
    if (piece !== undefined && piece !== this.heldPiece) {
      this.heldPiece = piece;
      piece.animatePropertyChange('y', -floatBy, 10, sinHalf2);
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