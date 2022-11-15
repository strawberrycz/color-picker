import './style.scss'

import {
    Pointer,
    RGB,
    ShadePicker
} from './shadePicker';
import {BaseColorPicker} from './baseColorPicker';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="color_picker_top-wrapper">
        <div class="shade_picker-container">
            <canvas id="shade_picker"></canvas>
            <div id="pointer" class="pointer">+</div>
        </div>
        <div class="inputs_container">
            <label for="red">RED: </label><input id="red">
            <label for="green">GREEN: </label><input id="green">
            <label for="blue">BLUE: </label><input id="blue">
        </div>
    </div>
 
    <div class="base_color_picker-container">
      <canvas id="base_color_picker"></canvas>
      <div id="color_bar" class="color_bar"></div>
    </div>
    
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

function setBar(pos: Pointer) {
    let pointer = <HTMLElement>document.getElementById('color_bar');
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

base_color_picker.addEventListener('bar', (e) => {
    let position = (e as CustomEvent).detail as Pointer;
    setBar(position);
}, false);

base_color_picker.addEventListener('color', (e) => {
    let color = (e as CustomEvent).detail as RGB;
    sh.setBaseColor(color);
}, false);

const sh = new ShadePicker(300, 300, shade_picker);
new BaseColorPicker(300, 20, base_color_picker);