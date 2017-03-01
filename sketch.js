var osc;
var env;

var button;
var oscSelect;
var slider;
var playing = false;

function Box(x, y, width, height, moveable) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.moveable = moveable;

    this.display = function() {
        noStroke();
        fill('red');
        rect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
        if(moveable) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    this.click = function() {

    }

}

function setup() {
	createCanvas(400, 400);
    background(51);
    select('canvas').style('display', 'block');

    env = new p5.Env();
    env.setADSR(0.5, 0.25, 0.5, 0.1);
    env.setRange(0.8, 0);
    
    osc = new p5.Oscillator();
    osc.amp(env);
    osc.start();

    slider = createSlider(100, 1200, 440);
    oscSelect = createSelect();
    oscSelect.option('sine');
    oscSelect.option('triangle');
    oscSelect.option('sawtooth');
    oscSelect.option('square');
    
    button = createButton('play/pause');
    button.mousePressed(toggle);

    box = new Box(200, 200, 30, 30, true);
    
}

function mousePressed() {

}

function draw() {
    background(51);
    box.display();
    if(mouseIsPressed && 
    (dist(mouseX, mouseY, box.x, box.y) < box.width/2))
        box.move();
}

function toggle() {
    if(!playing) {
        env.play();
        playing = true;
    } else {
        playing = false;
    }
}