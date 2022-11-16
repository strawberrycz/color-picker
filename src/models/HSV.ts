export class HSV {
    h: number;
    s: number;
    v: number;
    constructor(h: number, s: number, v: number) {
        this.h = h;
        this.s = s;
        this.v = v;
    }

    get hsvToText(): string {
        return `hsv(${this.h}, ${this.s}, ${this.v})`;
    }
}