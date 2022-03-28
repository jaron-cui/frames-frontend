export class Shape {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale || 1;
  }

  draw(context) {

  }
}

export class Circle extends Shape {
  constructor(x, y, radius, color) {
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
  constructor(x, y, width, height, color) {
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
  constructor(x, y, path, scale) {
    super(x, y, scale);
    this.image = new Image();
    this.image.src = path;
  }

  draw(context) {
    const scale = "" + this.scale * 100 + "%";
    
    //document.body.appendChild(image)
    context.drawImage(this.image, this.x, this.y);
  }
}