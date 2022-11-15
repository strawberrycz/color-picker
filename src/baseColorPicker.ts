import {Pointer, RGB} from "./shadePicker";

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


        // this.render();
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        const colors = [
            '#f00', // red (#f00)
            '#ff0', // yellow (#ff0)
            '#0f0', // green (#0f0)
            '#0ff', // aqua (#0ff)
            '#00f', // blue (#00f)
            '#f0f', // magenta (#f0f)
            '#f00'  // red (#f00)
        ];

        // render color palette
        for (let i = 0; i < colors.length - 1; i++) {
            let width = this.canvasWidth / (colors.length - 1);
            console.log(colors[i], i, width);
            let gradient = this.ctx.createLinearGradient(i*width, 0, (i+1) * width, 0);
            gradient.addColorStop(0, colors[i]);
            gradient.addColorStop(1, colors[i+1]);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i*width, 0, width, this.canvasHeight);
        }

        this.canvas.addEventListener('click', (event) => {
            let x = event.offsetX;  // Get X coordinate

            let pixel = this.ctx.getImageData(x, 1, 1, 1)['data'];   // Read pixel Color
            let rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`; // TODO: remove
            console.log('RGB: ', rgb, x);
            this.canvas.dispatchEvent(new CustomEvent('color', { detail: new RGB(pixel[0], pixel[1], pixel[2]) }));
            this.canvas.dispatchEvent(new CustomEvent('bar', { detail: new Pointer(x, 1) }))
            document.body.style.background = rgb;    // Set this color to body of the document
        });
    }
}