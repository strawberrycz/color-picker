import {Pointer} from './models/Pointer';
import {HSV} from './models/HSV';
import {RGB} from './models/RGB';

export class ShadePicker {
  canvasWidth: number;
  canvasHeight: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  baseColor: string = '#f00';
  pointerPosition: Pointer = new Pointer(0, 0);

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

    this.fillCanvas();

    this.canvas.addEventListener('click', (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      this.setPointerPosition(x, y);
      this.emitActualColor();
    });
  }

  setPointerPosition(x: number, y: number) {
    this.pointerPosition = new Pointer(x, y);
    this.canvas.dispatchEvent(new CustomEvent('pointer', { detail: this.pointerPosition }));
  }

  setPositionFromHSV(hsv: HSV) {
    const x = hsv.v * this.canvasWidth;
    const y = this.canvasHeight - (hsv.s * this.canvasHeight);

    this.setPointerPosition(x, y);
  }

  setBaseColor(color: RGB) {
    this.baseColor = color.rgbToText;
    this.fillCanvas();
  }

  emitActualColor() {
    let pixel = this.ctx.getImageData(this.pointerPosition.x, this.pointerPosition.y, 1, 1)['data'];   // Read pixel Color
    this.canvas.dispatchEvent(new CustomEvent('color', { detail: new RGB(pixel[0], pixel[1], pixel[2]) }));
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
