var osc;

var button;
var oscSelect;
var slider;
var playing = false;

function setup() {
	createCanvas(400, 400);
    select('canvas').style('display', 'block');
    
    osc = new p5.Oscillator();
    slider = createSlider(100, 1200, 440);
    oscSelect = createSelect();
    oscSelect.option('sine');
    oscSelect.option('triangle');
    oscSelect.option('sawtooth');
    oscSelect.option('square');
    
    button = createButton('play/pause');
    button.mousePressed(toggle);
    
}

function draw() {
    osc.freq(slider.value());
    osc.setType(oscSelect.value());
}

function toggle() {
    if(!playing) {
        osc.start();
        playing = true;
    } else {
        osc.stop();
        playing = false;
    }
}