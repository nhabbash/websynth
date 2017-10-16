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
var octave_sel;
var preset_sel;
var mode_radio;
var setButton;

var octave;
var preset;
var mode;
var vol;

var fft, waveform;
var fftvalues, wavevalues;

// Synth
var keys_pressed = [];
var synth;

function keyPressed(){

    switch(keyCode){
      case 38:
        if(octave<6){
          octave_sel.options[octave_sel.selectedIndex+1].selected=true;
          octave+=1;
        }
        break;
      case 40:
        if(octave>1){
          octave_sel.options[octave_sel.selectedIndex-1].selected=true;
          octave-=1;
        }
        break;

      default:
      if(keyboard1.hasOwnProperty(key.toLowerCase()))
        noteTriggered(key.toLowerCase(), octave);
      else if (keyboard2.hasOwnProperty(key.toLowerCase()))
        noteTriggered(key.toLowerCase(), octave+1);
    }
}

function keyReleased() {
    noteReleased(key.toLowerCase(), octave);
}

function noteTriggered(key, octave){

  key_token = key + octave;
    if(!keys_pressed.includes(key_token)) {
      keys_pressed.push(key_token);
      synth.triggerAttack(keyboard1[key]+octave);
      document.getElementById(key).classList.add("selected");
    }
}

function noteReleased(key, octave){

  key_token = key + octave;

  if(keyboard1.hasOwnProperty(key)) {
     if(keys_pressed.includes(key_token)) {
       synth.triggerRelease(keyboard1[key]+octave);
       keys_pressed.splice(keys_pressed.indexOf(key_token), 1);
       document.getElementById(key).classList.remove("selected");
     }
 }else{
   if(keyboard2.hasOwnProperty(key))
      if(keys_pressed.includes(key_token)) {
        synth.triggerRelease(keyboard2[key]+(parseInt(octave)+1));
        keys_pressed.splice(keys_pressed.indexOf(key_token), 1);
        document.getElementById(key).classList.remove("selected");
      }
  }
}

function setSynth(){

  octave = parseInt(octave_sel.options[octave_sel.selectedIndex].value);
  preset = parseInt(preset_sel.options[preset_sel.selectedIndex].value);

  for(var i = 0; i < mode_radio.length; i++){
    if(mode_radio[i].checked)
        mode = parseInt(mode_radio[i].value);
    }

  synth.dispose();

  switch(preset){
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
      synth = new Tone.PolySynth(10, Tone.PluckSynth).toMaster();
      break;
    case 7:
      synth = new Tone.PolySynth(3, Tone.SimpleSynth).set({
			'volume' : -4,
			'oscillator' : {
				'type' : 'triangle17',
				// 'partials' : [16, 8, 4, 2, 1, 0.5, 1, 2]
			},
			'envelope' : {
				'attack' : 0.01,
				'decay' : 0.1,
				'sustain' : 0.2,
				'release' : 1.7,
			}
		}).toMaster();
      break;

      synth.fan(waveform).toMaster();
  }

  vol = document.getElementById("volume").value;
  document.getElementsByName("volumeInput")[0].value = vol;
  synth.volume.value = vol;
}

function setup(){
  octave_sel = document.getElementById("octaves");
  octave = parseInt(octave_sel.options[octave_sel.selectedIndex].value);

  preset_sel = document.getElementById("presets");

  mode_radio = document.getElementsByName("mode");
  mode = 0;

  setButton = document.getElementById('setButton');
  setButton.addEventListener('click', function() {
      setSynth();
  });

  synth = new Tone.PolySynth(10, Tone.Synth).toMaster();

  vol = -25;
  synth.volume.value = vol;
  document.getElementsByName("volumeInput")[0].value = vol;
  document.getElementById("volume").value = vol;

  //FFT
  createCanvas(800,400);
  noFill();
  background(30);

  waveform = new Tone.Waveform(1024);
  synth.fan(waveform).toMaster();

}

function updateTextInput(val, id) {
  document.getElementById(id).value = val;

  switch(id){
    case "volume":
      synth.volume.value = val;
    break;

    case "phase":
    synth.voices.forEach(function(voice){
      voice.oscillator.phase = val;
      });
    break;

    case "attack":
      synth.voices.forEach(function(voice){
        voice.envelope.attack = val;
        });
    break;

    case "decay":
      synth.voices.forEach(function(voice){
        voice.envelope.decay = val;
        });
    break;

    case "sustain":
      synth.voices.forEach(function(voice){
        voice.envelope.sustain = val;
        });
    break;

    case "release":
      synth.voices.forEach(function(voice){
        voice.envelope.release= val;
        });
      break;
  }
}

function draw() {
  background(30);
  // draw the shape of the waveform
  wavevalues = waveform.getValue();
  drawWaveform(wavevalues);
  //waveform = waveform.dispose();
}

function drawWaveform(wavevalues){
  noFill();
  beginShape();
  stroke(255, 255, 255);
  strokeWeight(1);
  for (var i = 0; i < wavevalues.length; i++){
    var x = map(i, 0, wavevalues.length, 0, width);
    var y = map(wavevalues[i]*10, -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}
