function Voice(synth, note) {
  this.synth = synth;
  this.note = note;

  this.play = function() {
    this.synth.osc.start();
    this.synth.osc.freq(midiToFreq(note));
    this.synth.env.triggerAttack();
  }

  this.release = function() {
    this.synth.env.triggerRelease();
    this.synth.osc.stop(0.3);
    //Stop needs have in input the value of Release of the envelope + small time
  }

}