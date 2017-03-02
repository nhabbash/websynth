var osc;
var env;

var button;
var oscSelect;
var slider;

function setup() {
    var cnv = createCanvas(400, 400);
    background(51);
    select('canvas').style('display', 'block');

    slider = createSlider(100, 1200, 440);
    oscSelect = createSelect();
    oscSelect.option('sine');
    oscSelect.option('triangle');
    oscSelect.option('sawtooth');
    oscSelect.option('square');

    env = new p5.Env();
    env.setADSR(0.5, 0.25, 0.5, 0.2);
    env.setRange(0.8, 0);
    
    osc = new p5.Oscillator();
    osc.amp(env);
    osc.start();
    
    button = createButton('play/pause');
    button.mousePressed(env.triggerAttack);
    box = new Box(200, 200, 30, 30, true);


}

function mousePressed() {
    if(mouseIsPressed) {
        box.click();
    }
}

function mouseReleased() {
    env.triggerRelease();
}

function draw() {
    background(51);
    box.display();
    
    if(mouseIsPressed)
        box.move();
}
