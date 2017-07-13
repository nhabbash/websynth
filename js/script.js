/*
var keyboard = {q: 100, "2": 101, w: 102, "3": 103, e: 104, "4": 105, r: 1010, "5": 107,
                t: 108, "10": 109,  y: 70, "7": 71, u: 72};
var notes = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};
*/

// Keyboard
var keyboard1 = {q: "C", "2": "C#", w: "D", "3": "D#", e: "E", r: "F", "5": "F#", t: "G",
                "6": "G#", y: "A",  "7": "A#", u: "B"};
var keyboard2 = {z: "C", s: "C#", x: "D", d: "D#", c: "E", v: "F", g: "F#", b: "G",
                                h: "G#", n: "A",  j: "A#", m: "B"};

// Interface
var sel;
var octave;
var preset;
var setButton;

// Synth
var keys_pressed = [];
var synth;

function keyPressed(){

    key = key.toLowerCase();
    key_token = key + octave;

    if(keyboard1.hasOwnProperty(key)) {
        if(!keys_pressed.includes(key_token)) {
          keys_pressed.push(key_token);
          synth.triggerAttack(keyboard1[key]+octave);
          document.getElementById(key).classList.add("selected");
        }
    }else{
      if(keyboard2.hasOwnProperty(key)) {
          if(!keys_pressed.includes(key_token)) {
            keys_pressed.push(key_token);
            synth.triggerAttack(keyboard2[key]+(parseInt(octave)+1));
            document.getElementById(key).classList.add("selected");
          }
      }
    }
}

function keyReleased() {

    key = key.toLowerCase();
    key_token = key + octave;

    if(keyboard1.hasOwnProperty(key)) {
       if(keys_pressed.includes(key_token)) {
         synth.triggerRelease(keyboard1[key]+octave);
         keys_pressed.splice(keys_pressed.indexOf(key_token), 1);
         document.getElementById(key).classList.remove("selected");
       }
   }else{
     if(keyboard2.hasOwnProperty(key)) {
        if(keys_pressed.includes(key_token)) {
          synth.triggerRelease(keyboard2[key]+(parseInt(octave)+1));
          keys_pressed.splice(keys_pressed.indexOf(key_token), 1);
          document.getElementById(key).classList.remove("selected");
        }
    }
  }
}

function noteTriggered(){

}

function noteReleased(){

}

function setSynth(){

  sel = document.getElementById("octaves");
  octave = sel.options[sel.selectedIndex].value;

  sel = document.getElementById("presets");
  preset = sel.options[sel.selectedIndex].value;

  switch(parseInt(preset)){
    case 1:
      synth = new Tone.PolySynth(10, Tone.MonoSynth).toMaster();
      break;
    case 2:
      synth = new Tone.PolySynth(10, Tone.AMSynth).toMaster();
      break;
    case 3:
      synth = new Tone.PolySynth(10, Tone.DuoSynth).toMaster();
      break;
    case 4:
      synth = new Tone.PolySynth(10, Tone.FMSynth).toMaster();
      break;
    case 5:
      synth = new Tone.PolySynth(10, Tone.MembraneSynth).toMaster();
      break;
    case 6:
      synth = new Tone.PolySynth(10, Tone.NoiseSynth).toMaster();
      break;
    case 7:
      synth = new Tone.PolySynth(10, Tone.PluckSynth).toMaster();
      break;
    case 8:
      synth = new Tone.PolySynth(10, Tone.MetalSynth).toMaster();
    break;
  }
}

function setup(){
  sel = document.getElementById("octaves");
  octave = sel.options[sel.selectedIndex].value;

  synth = new Tone.PolySynth(10, Tone.MembraneSynth).toMaster();

  setButton = document.getElementById('setButton');
  setButton.addEventListener('click', function() {
      //sel.options[sel.selectedIndex].setAttribute("selected");
      setSynth();
  });
}
