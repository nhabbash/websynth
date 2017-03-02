var button;
var oscSelect;
var slider;
var oscs;

var pressedNotes;

var notesFreq = [16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87];
var notesIndexes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var keyboard = {a: 0, s: 1, d: 2, f: 3, g: 4, h: 5, j: 6, k: 7, l: 8, n: 9,  m: 10};

function setup() {
    /*var cnv = createCanvas(400, 400);
    background(51);
    select('canvas').style('display', 'block');

    slider = createSlider(100, 1200, 440);
    oscSelect = createSelect();
    oscSelect.option('sine');
    oscSelect.option('triangle');
    oscSelect.option('sawtooth');
    oscSelect.option('square');
    
    button = createButton('play/pause');
    box = new Box(200, 200, 30, 30, true);

    oscs = [];*/

}

function mousePressed() {
    /*if(mouseIsPressed) {
        box.click();
    }
    env.triggerAttack();*/
}

function mouseReleased() {
    //env.triggerRelease();
}

function draw() {
    /*background(51);
    box.display();
    
    if(mouseIsPressed)
        box.move();*/
}

function playNote(k) {
    if(!pressedKeys.includes(k)){
        pressedKeys.push(k);
        
        var env = new p5.Env();
        var osc = new p5.Oscillator();
        var note = notesFreq[keyboard[k]]*16;

        osc.setType(oscSelect.value());

        env.setADSR(0.5, 0.25, 0.5, 0.2);
        env.setRange(0.8, 0);

        osc.amp(env);
        osc.freq(note);
        osc.start();
        env.triggerAttack();
    }
}

function keyTyped (){
    playNote(key);
}