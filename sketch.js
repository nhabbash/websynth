var osc;
var env;

var button;
var oscSelect;
var slider;
var playing = false

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
    box.click();
}

function draw() {
    background(51);
    box.display();
    
    if(mouseIsPressed)
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