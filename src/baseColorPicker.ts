import {Pointer} from './models/Pointer';
import {HSV} from './models/HSV';
import {RGB} from './models/RGB';

export class BaseColorPicker {
    canvasWidth: number;
    canvasHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvasWidth: number, canvasHeight: number, canvas: HTMLCanvasElement) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
        if (this.ctx === null) throw new Error('Context identifier not supported');

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        const colors = [
            'rgb(255,0,0)', // red (#f00)
            'rgb(255,255,0)', // yellow (#ff0)
            'rgb(0,255,0)', // green (#0f0)
            'rgb(0,255,255)', // aqua (#0ff)
            'rgb(0,0,255)', // blue (#00f)
            'rgb(255,0,255)', // magenta (#f0f)
            'rgb(255,0,0)'  // red (#f00)
        ];

        // render color palette
        for (let i = 0; i < colors.length - 1; i++) {
            let width = this.canvasWidth / (colors.length - 1);
            let gradient = this.ctx.createLinearGradient(i*width, 0, (i+1) * width, 0);
            gradient.addColorStop(0, colors[i]);
            gradient.addColorStop(1, colors[i+1]);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i*width, 0, width, this.canvasHeight);
        }

        this.canvas.addEventListener('click', (event) => {
            let x = event.offsetX;  // Get X coordinate

            this.emitColor(x);
            this.setBarPosition(x);
        });
    }

    setBarPosition(x: number) {
        this.canvas.dispatchEvent(new CustomEvent('bar', { detail: new Pointer(x, 1) }));
    }

    barPositionFromHSL(hsv: HSV) {
        const x = (this.canvasWidth / 360) * hsv.h;
        this.setBarPosition(x);
    }

    emitColor(x: number) {
        let pixel = this.ctx.getImageData(x, 1, 1, 1)['data'];   // Read pixel Color
        this.canvas.dispatchEvent(new CustomEvent('color', { detail: new RGB(pixel[0], pixel[1], pixel[2]) }));
    }
}