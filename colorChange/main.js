let r, g, b;
const body = document.querySelector("body");
const output = document.getElementById("color-name");
document.querySelector('button').onclick = changeColor;

function changeColor(e) {
  r = Math.ceil(Math.random() * 255);
  g = Math.ceil(Math.random() * 255);
  b = Math.ceil(Math.random() * 255);
  output.innerText = rgbToHex(r, g, b);
  body.style.backgroundColor = `rgb(${r}, ${g} ,${b})`;
}

/**
 * SOURCE: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param {*} r - r color value
 * @param {*} g - g color value
 * @param {*} b - b color value
 */

function rgbToHex(r, g, b) {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
} 