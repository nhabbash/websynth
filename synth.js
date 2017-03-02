function Synth(osc, env) {
  this.osc = osc;
  this.env = env;

  this.connect = function() {
    this.osc.amp(this.env);
  }
}