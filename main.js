var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var gradient = document.getElementById("gradient");
var chosenColor = document.getElementById("color");
var chosenColorPerc = document.getElementById("colorPerc");
var chosenColorRGB = document.getElementById("colorRGB");

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);

let chosenPerc = 50;
const WIDTH = 101;
const HEIGHT = 1;

let context;


setGradient();

function initCanvas(gradientColors) {
  const canvasElement = document.createElement("CANVAS");
  canvasElement.width = WIDTH;
  canvasElement.height = HEIGHT;
  context = canvasElement.getContext("2d");
  
  const gradient = context.createLinearGradient(0, 0, WIDTH, 0); // x0, y0, x1, y1

  const step = 1
  let val = 0;
  gradientColors.forEach((color) => {
    gradient.addColorStop(val, color);
    val += step;
  });

  context.fillStyle = gradient;
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

function setGradient() {
    gradient.style.background =
      "linear-gradient(to right," + color1.value + "," + color2.value + ")";
    initCanvas([color1.value, color2.value]);
    updateScreen();
  }

function updateSlider(percentage) {
  chosenPerc = parseInt(percentage);
  updateScreen();
}

function updateScreen(){
    chosenColorPerc.innerHTML = chosenPerc + "%";
    chosenColorRGB.innerHTML = getColor(chosenPerc);
    chosenColor.style.backgroundColor = getColor(chosenPerc);
}

function getColor(percent) {
    const color = context.getImageData(percent, 0, 1, 1);
    const rgba = color.data;
  
    return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
  }



