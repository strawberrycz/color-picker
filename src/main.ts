import './style.css'

import {
    Pointer,
    RGB,
    ShadePicker
} from './shadePicker';
import {BaseColorPicker} from './baseColorPicker';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="shade_picker-container">
      <canvas id="shade_picker"></canvas>
      <div id="pointer" class="pointer">+</div>
    </div>
    <div class="inputs_container">
        <label for="red">RED: </label><input id="red">
        <label for="green">GREEN: </label><input id="green">
        <label for="blue">BLUE: </label><input id="blue">
    </div>
    <canvas id="base_color_picker" style="border:1px solid #1a1a1a"></canvas>
    
  </div>
`
let redRef = <HTMLInputElement>document.getElementById('red');
let greenRef = <HTMLInputElement>document.getElementById('green');
let blueRef = <HTMLInputElement>document.getElementById('blue');

setPointer(new Pointer(0, 0));
setColorInputs(new RGB(0, 0, 0));

function setColorInputs(color: RGB) {
    redRef.value = String(color.r);
    greenRef.value = String(color.g);
    blueRef.value = String(color.b);
}

function setPointer(pos: Pointer) {
    let pointer = <HTMLElement>document.getElementById('pointer');
    pointer.style.top = `${pos.y}px`;
    pointer.style.left = `${pos.x}px`;
}

const shade_picker = <HTMLCanvasElement>document.getElementById('shade_picker')!;
const base_color_picker = <HTMLCanvasElement>document.getElementById('base_color_picker')!;
shade_picker.addEventListener('color', (e) => {
    let color = (e as CustomEvent).detail as RGB;
    console.log(color);
    setColorInputs(color);
}, false);

shade_picker.addEventListener('pointer', (e) => {
    let position = (e as CustomEvent).detail as Pointer;
    setPointer(position);
}, false);

new ShadePicker(300, 300, shade_picker);
new BaseColorPicker(400, 40, base_color_picker);