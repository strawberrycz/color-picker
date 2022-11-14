import './style.css'

import {
    Pointer,
    RGB,
    ShadePicker
} from './shadePicker';

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
    
  </div>
`
let color = new RGB(0, 0, 0);
let redRef = <HTMLInputElement>document.getElementById('red');
let greenRef = <HTMLInputElement>document.getElementById('green');
let blueRef = <HTMLInputElement>document.getElementById('blue');

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
shade_picker.addEventListener('color', (e) => {
    color = (e as CustomEvent).detail as RGB;
    console.log(color);
    setColorInputs(color);
}, false);

shade_picker.addEventListener('pointer', (e) => {
    let position = (e as CustomEvent).detail as Pointer;
    console.log(position);
    setPointer(position);
}, false);

const sp = new ShadePicker(300, 300, shade_picker);
sp.setBaseColor('#ff0000');
