// canvas dimensions
let cwidth = 600;
let cheight = 600;

// offset vertex.y
let yoff = 0;

// x and y increments
let xinc = 0.02; // higher xinc the more mountainlike shape
let yinc = 0.005; // higher yinc the more layering 

// star object and color
let star = {
  x: 100,
  y: 50,
  r: 1.2,
};

let col = {
  r: 255,
  g: 0,
  b: 0
};

// captures millis
let mstime = 0;

// global setup function
function setup() {
  initSetup(); 
}

// global draw function
function draw() {
  initDraw();
}




// function to display stars
function displayStar() {
  col.r = random(230, 255);
  col.g = random(230, 255);
  col.b = random(230, 255);
  star.x = random(0, width);
  star.y = random(0, height / 2.7);
  star.r = random(1, 2);
  noStroke();
  fill(col.r, col.g, col.b);
  // add star every 20 ms
  if (frameCount %20 == 0) {
    // stop drawing stars after 20s
    if(millis() < mstime + 20000) {
  ellipse(star.x, star.y, star.r, star.r);
    }
  }
}

// mouse press trigger to reset sketch

function mousePressed() {
  initSetup();
  initDraw();
}

// local setup function
function initSetup() {
  // mstime needs to be in initSetup function
  mstime = millis();
  createCanvas(cwidth, cheight);
  background(31, 21, 35);
  // adjusts the character and level of detail
  // of Perlin Noise [default = 4]
  noiseDetail(3);
  // create extra canvas with tranparency for Perlin Noise layer
  // this allows stars not to leave a trail
  extraCanvas = createGraphics(cwidth, cheight);
  extraCanvas.clear();
  extraCanvas.background(25, 25, 25, 1);
}

// local draw function
function initDraw() {
  displayStar();
  image(extraCanvas, 0, 0);
  extraCanvas.strokeWeight(0.15);
  extraCanvas.noFill();
  extraCanvas.beginShape();
  let xoff = 0; 
  for (let x = 0; x <= width; x += 8) {
    let y = map(noise(xoff, yoff), 0, 1, height / 4, height * 1.65) 
    extraCanvas.vertex(x, y);
    xoff += xinc;
  }
  // stop drawing vertices after 20s
  if (millis() < mstime + 20000) {
    yoff += yinc;
    extraCanvas.vertex(width, height);
    extraCanvas.vertex(0, height);
    extraCanvas.stroke(151,76,0, 10);
    }
  extraCanvas.endShape();
}