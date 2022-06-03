export class Shape {
  x: number;
  y: number;
  scale: number;

  constructor(x: number, y: number, scale?: number) {
    this.x = x;
    this.y = y;
    this.scale = scale || 1;
  }

  draw(context) {

  }
}

export class Circle extends Shape {
  radius: number;
  color: any;
  constructor(x: number, y: number, radius: number, color: any) {
    super(x, y);
    this.radius = radius;
    this.color = color || "#000000";
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Rectangle extends Shape {
  width: number;
  height: number;
  color: any;
  constructor(x: number, y: number, width: number, height: number, color: any) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class ImageTexture extends Shape {
  image: HTMLImageElement;
  constructor(x: number, y: number, path: string, scale: number) {
    super(x, y, scale);
    this.image = new Image();
    this.image.src = path;
  }

  draw(context) {
    const scale = "" + this.scale * 100 + "%";
    context.drawImage(this.image, this.x, this.y);
  }
}