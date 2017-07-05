/*
var keyboard = {q: 60, "2": 61, w: 62, "3": 63, e: 64, "4": 65, r: 66, "5": 67,
                t: 68, "6": 69,  y: 70, "7": 71, u: 72};
var notes = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};
*/

var keyboard = {q: "C", "2": "C#", w: "D", "3": "D#", e: "E", r: "F", "5": "F#", t: "G",
                "6": "G#", y: "A",  "7": "A#", u: "B"};
var octave = 4;
var keys_pressed = [];
var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

function keyPressed(){
    key = key.toLowerCase();
    if(keyboard.hasOwnProperty(key)) {
        if(!keys_pressed.includes(key)) {
          keys_pressed.push(key);
          synth.triggerAttack(keyboard[key]+octave);

        }
    }
}

function keyReleased() {
    key = key.toLowerCase();
    if(keyboard.hasOwnProperty(key)) {
       if(keys_pressed.includes(key)) {
         synth.triggerRelease(keyboard[key]+octave);
         keys_pressed.splice(keys_pressed.indexOf(key), 1);
       }
   }
}

function setup(){
  
}
