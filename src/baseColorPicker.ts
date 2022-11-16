import {Pointer, RGB} from "./shadePicker";

export class BaseColorPicker { // TODO parent class picker
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
            '#f00', // red (#f00)
            '#ff0', // yellow (#ff0)
            '#0f0', // green (#0f0)
            '#0ff', // aqua (#0ff)
            '#00f', // blue (#00f)
            '#f0f', // magenta (#f0f)
            '#f00'  // red (#f00)
        ];

        // var ctx = canvas.getContext("2d");
        // var gradient = ctx.createLinearGradient(10, 0, 500, 0);
        // gradient.addColorStop(0, 'red');
        // gradient.addColorStop(1 / 6, 'orange');
        // gradient.addColorStop(2 / 6, 'yellow');
        // gradient.addColorStop(3 / 6, 'green');
        // gradient.addColorStop(4 / 6, 'blue');
        // gradient.addColorStop(5 / 6, 'indigo');
        // gradient.addColorStop(1, 'violet');
        // ctx.fillStyle = gradient;
        // ctx.fillRect(0, 0, 500, 75);

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

            let pixel = this.ctx.getImageData(x, 1, 1, 1)['data'];   // Read pixel Color
            this.canvas.dispatchEvent(new CustomEvent('color', { detail: new RGB(pixel[0], pixel[1], pixel[2]) }));
            this.canvas.dispatchEvent(new CustomEvent('bar', { detail: new Pointer(x, 1) }));
        });
    }
}