import './style.scss'

import {
    ShadePicker
} from './shadePicker';
import {BaseColorPicker} from './baseColorPicker';
import {Pointer} from './models/Pointer';
import {RGB} from './models/RGB';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="color_picker_top-wrapper">
        <div class="shade_picker-container">
            <canvas id="shade_picker"></canvas>
            <div id="pointer" class="pointer">+</div>
        </div>
        <form id="form" class="inputs_container">
            <label for="red">RED: </label><input type="number" name="red" id="red" min="0" max="255">
            <label for="green">GREEN: </label><input type="number" name="green" id="green" min="0" max="255">
            <label for="blue">BLUE: </label><input type="number" name="blue" id="blue" min="0" max="255">
            <button type="button" id="copy_to_clipboard">Copy to clipboard</button>
        </form>
    </div>
 
    <div class="base_color_picker-container">
      <canvas id="base_color_picker"></canvas>
      <div id="color_bar" class="color_bar"></div>
    </div>
    
  </div>
`
const redRef = <HTMLInputElement>document.getElementById('red');
const greenRef = <HTMLInputElement>document.getElementById('green');
const blueRef = <HTMLInputElement>document.getElementById('blue');

let actualColor = new RGB(0, 0, 0);

setPointer(new Pointer(0, 0));
setColorInputs(actualColor);

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

function setActualColor(color: RGB) {
    actualColor = color;
    document.body.style.background = color.rgbToText;
}

const shade_picker = <HTMLCanvasElement>document.getElementById('shade_picker')!;
const base_color_picker = <HTMLCanvasElement>document.getElementById('base_color_picker')!;

shade_picker.addEventListener('color', (e) => {
    let color = (e as CustomEvent).detail as RGB;
    setColorInputs(color);
    setActualColor(color);
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
    sh.emitActualColor();
}, false);

const sh = new ShadePicker(300, 300, shade_picker);
const bcp = new BaseColorPicker(300, 20, base_color_picker);

let copyToClipboardRef = <HTMLButtonElement>document.getElementById('copy_to_clipboard');
copyToClipboardRef.addEventListener('click', async () => {
    await navigator.clipboard.writeText(actualColor.rgbToText);
    const previousText = copyToClipboardRef.textContent;
    copyToClipboardRef.textContent = 'Copied';
    setTimeout(() => copyToClipboardRef.textContent = previousText, 2000);
}, false);

const formRef = <HTMLFormElement>document.getElementById('form');
formRef.addEventListener('input', () => {
    const formData = new FormData(formRef);
    const color = new RGB(
        Number(formData.get("red")),
        Number(formData.get("green")),
        Number(formData.get("blue")));
    bcp.barPositionFromHSL(color.HSV);
    sh.setPositionFromHSV(color.HSV);
    sh.setBaseColor(color);
    setActualColor(color);
}, false);