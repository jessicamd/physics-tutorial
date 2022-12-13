let topSlit = 15;
let botSlit = 15;
let slitDist = 15;
let screenDist = 500;

let wavelength = 400;
let first_node_y;

let img;
function preload() {
  img = loadImage('light.png');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  s = new SlitScreen(x = windowWidth / 4, topSlit = 15, botSlit = 15, t = 15, d = 50, screenDist = 500);
  l_sides = (windowHeight - s.topSlit - s.botSlit - s.slitDist) / 2;
  textSize(20);
  n1 = new Node(0);
  n2 = new Node(1);
  n3 = new Node(-1);
  n4 = new Node(2);
  n5= new Node(-2);

  slider2 = createSlider(380, 740, 500, 1); // visible light spectrum
  slider2.position(30, 175);
  slider2.style('width', '200px');

  slider3 = createSlider(10, 100, 20, 1);
  slider3.position(30, 250);
  slider3.style('width', '200px');

  slider4 = createSlider(100, 1000, 500, 1);
  slider4.position(30, 325);
  slider4.style('width', '200px');

  // preload();
  // image(img, 0, 0, 5000, 5000);
  // image(img, 900, 50);
  
}

function draw() {
  // put drawing code here
  background(139, 129, 100);

  s.display();
  s.update();

  n1.display();
  n1.update();

  n2.display();
  n2.update();

  n3.display();
  n3.update();

  n4.display();
  n4.update();

  n5.display();
  n5.update();

  first_node_y = (windowHeight / 2) + ((-1) * screenDist * wavelength) / slitDist * Math.pow(10, -2);

  stroke(255, 255, 255);
  fill(255, 255, 255);
  rect(10, 20, 425 , 400, 10);

  textSize(40);
  fill(0, 102, 153);
  text("Young's Experiment", 30, 100);
  textSize(20);

  wavelength = slider2.value();
  fill(0, 102, 153);
  text("Wavelength (λ): " + wavelength + " nm", 35, 170);

  slitDist = slider3.value();
  fill(0, 102, 153);
  text("Distance between slits (d): " + slitDist + " µm", 35, 245);

  screenDist = slider4.value();
  fill(0, 102, 153);
  text("Wall distance (L): " + screenDist + " m", 35, 320);

  stroke(255, 255, 255);
  fill(255, 255, 255);
  textSize(15 + (screenDist * wavelength) / slitDist * (1/1500));
  text("Node", 50, 700);
  text("Distance", 50, 700 + 20 + (screenDist * wavelength) / slitDist * (1/1500));
  textSize(50);
  text("=", 220, 700);
  textSize(screenDist/ 10);
  text("L", 300, 700);
  textSize(wavelength / 10);
  text("λ", 375, 700);
  strokeWeight(5);
  line(300, 720, 420, 720);
  strokeWeight(1);
  textSize(20 + (1/2) * slitDist);
  text("d", 335, 800);
  textSize(20);
  text("Node distance is the distance between a pair of adjacent yellow nodes, for example m = 0 and m = 1.", 335, 900);
  text("These yellow nodes represent points of light created by the constructive interference of the lightwaves from the slits.", 335, 930);
  image(img, 100, windowHeight / 2 - 135, 400, 400);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// class Wave{
//   constructor(x = 50, y = 50, w = 10){
//     this.x = x;
//     this.wavelength = w;
//   }
//   display(){
//     stroke(255, 204, 0);
//     strokeWeight(4);
//     line(this.x + 100, 0, this.x + 100, windowHeight);
//   }
//   move(){
//     this.x += 3;
//   }
// }

class SlitScreen{
  constructor(x = windowWidth / 4, topSlit = 50, botSlit = 10, t = 15, d = 20, screenDist = 500){
    this.x = x;
    this.topSlit = topSlit;
    this.botSlit = botSlit;
    this.thickness = t;
    this.slitDist = slitDist;
    this.screenDist = screenDist;


  }
  display(){
    // set colors
    stroke(0, 102, 153);
    fill(0, 102, 153);

    // create view screen
    rect((windowWidth / 4) + this.screenDist, 0, 15, windowHeight);

    // create slit screen
    rect(windowWidth / 4,  l_sides + this.topSlit + this.slitDist + this.botSlit, this.thickness , l_sides);
    rect(windowWidth / 4, l_sides + this.topSlit, this.thickness , this.slitDist);
    rect(windowWidth / 4, 0, this.thickness , l_sides);


    // lines to help visualize triangles for computation, not very useful given scale
    // line((windowWidth / 4) + this.thickness, windowHeight / 2, (windowWidth / 4) + this.screenDist + this.thickness, windowHeight / 2);
    // line((windowWidth / 4) + this.thickness, windowHeight / 2, (windowWidth / 4) + this.screenDist + this.thickness, first_node_y);
    // curve((windowWidth / 4) + this.thickness + (1/8) * this.screenDist, windowHeight / 2, (windowWidth / 4) + this.thickness + (1/8) * this.screenDist, );

    // text("Θ", (windowWidth / 4) + this.thickness + 10, (windowHeight / 2));

    // line((windowWidth / 4) + this.thickness, l_sides + this.topSlit + this.slitDist + this.botSlit - (this.topSlit / 2), (windowWidth / 4) + this.screenDist + this.thickness, first_node_y);
    // line((windowWidth / 4) + this.thickness, l_sides + this.topSlit - (this.topSlit / 2), (windowWidth / 4) + this.screenDist + this.thickness, first_node_y);

  }
  update() {
    this.screenDist = screenDist;
    this.slitDist = slitDist;
    this.topSlit = topSlit;
    this.botSlit = botSlit;

    l_sides = (windowHeight - s.topSlit - s.botSlit - s.slitDist) / 2;
    redraw();
  }
}

class Node{
  constructor(m){
    this.m = m;
    this.screenDist = screenDist;
    this.wavelength = wavelength * Math.pow(10, -9);
    this.slitDist = slitDist * Math.pow(10, -6);
  }
  display(){
    stroke(255, 201, 55);
    fill(255, 201, 55);
    circle(windowWidth / 4 + screenDist + 8, (windowHeight / 2) + ((this.screenDist * this.m * this.wavelength) / this.slitDist) * 10, 30);
    text("m = " + (-1) * this.m +  "   center dist: " + (-1) * ((this.screenDist * this.m * this.wavelength) / this.slitDist) + " cm", windowWidth / 4 + screenDist + 40, ((windowHeight / 2) + ((this.screenDist * this.m * this.wavelength) / this.slitDist) * 10) + 10);
  }
  update() {
    this.screenDist = screenDist;
    this.wavelength = wavelength * Math.pow(10, -9);
    this.slitDist = slitDist * Math.pow(10, -6);
  }
}
