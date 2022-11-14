export class ShadePicker {
  canvasWidth: number;
  canvasHeight: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  baseColor: string = '#0000ff';

  constructor(canvasWidth: number, canvasHeight: number, canvas: HTMLCanvasElement) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    if (this.ctx === null) throw new Error('Context identifier not supported');

    this.render();
  }

  render() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
//     this.canvas.innerHTML = `
//         <div id="pointer" class="pointer">+</div>
// `

    this.fillCanvas();

    this.canvas.addEventListener('click', (event) => {
      let x = event.offsetX;  // Get X coordinate
      let y = event.offsetY;  // Get Y coordinate

      let pixel = this.ctx.getImageData(x, y, 1, 1)['data'];   // Read pixel Color
      let rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`; // TODO: remove
      console.log('RGB: ', rgb);
      this.canvas.dispatchEvent(new CustomEvent('color', { detail: new RGB(pixel[0], pixel[1], pixel[2]) }));
      this.canvas.dispatchEvent(new CustomEvent('pointer', { detail: new Pointer(x, y) }))
      document.body.style.background = rgb;    // Set this color to body of the document
    });
  }

  setBaseColor(color: string) {
    this.baseColor = color;
    this.fillCanvas();
  }

  fillCanvas() {
    // vertical color gradient (color to white)
    let gradientY = this.ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
    this.setGradient(gradientY, this.baseColor, '#fff');

    // horizontal gradient (black to transparent)
    let gradientX = this.ctx.createLinearGradient(0, 0, this.canvasWidth, 0);
    this.setGradient(gradientX, '#000', 'rgba(0, 0, 0, 0)');
  }

  setGradient(gradient: CanvasGradient, startColor: string, endColor: string) {
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}

export class RGB {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export class Pointer {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
