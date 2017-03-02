function Voice(synth, freq) {
  this.synth = synth;
  this.synths = [];

  this.synth.osc.freq(freq);

  this.play = function() {
    this.synth.osc.start();
    this.synth.env.triggerAttack();
    this.synths.push(this.synth);
  }

  this.stop = function() {

  }

}