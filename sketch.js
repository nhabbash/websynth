// MIDI  note values to keyboard temp association. 60 is middle C
var keyboard = {q: 60, "2": 61, w: 62, "3": 63, e: 64, "4": 65, r: 66, "5": 67, t: 68, "6": 69,  y: 70, "7": 71, u: 72};
var voices = [];
var pressedKeys = [];

function playNote(k) {
    if(!pressedKeys.includes(k)){
        pressedKeys.push(k);

        var env = new p5.Env();
        var osc = new p5.Oscillator();

        // Need to softcode Envelope variables, related to osc.stop
        env.setADSR(0.5, 0.25, 0.5, 0.2);
        env.setRange(0.8, 0);

        var synth = new Synth(osc, env);
        synth.connect();

        var note = keyboard[k];
        var voice = new Voice(synth, note);

        voice.play();

        voices.push(voice);
    }
}

function releaseNote(k) {
    if(pressedKeys.includes(k)) {
        var note = keyboard[k];
        voices.forEach(function(voice, index, array) {
            if(voice.note == note) {
                voice.release();
                array.splice(index, 1);
            }
        });
        pressedKeys.splice(pressedKeys.indexOf(k), 1);
    }
}

function keyPressed (){
    key = key.toLowerCase();

    if(keyboard.hasOwnProperty(key)) {
        playNote(key);
    }
}

function keyReleased() {
     key = key.toLowerCase();

    if(keyboard.hasOwnProperty(key)) {
       releaseNote(key);
   }
}

//*** Graphic stuff ***//

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