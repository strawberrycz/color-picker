import {HSV} from './HSV';

export class RGB {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get rgbToText(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    get HSV() {
        const val = this.rgb2hsv(this.r/255, this.g/255, this.b/255)
        return new HSV(val[0], val[1], val[2]);
    }

    rgb2hsv(r: number, g: number, b:number) {
        let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
        let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c));
        return [60*(h<0?h+6:h), v&&c/v, v];
    }
}