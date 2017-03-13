## websynth

Simple polyphonic web synthesizer using Web Audio API through p5.js.

# to do list
- [x] Basic oscillator module
- [x] Basic oscillator+envelope module
- [ ] Basic oscillator+env+filter module
- [x] Implement polyphony support
- [ ] MIDI support
- [ ] Graphics (HTML or canvas?)
- [ ] Sequencer (?)

# problems
- [ ] Sometimes the synth produces a high pitched sound when playing multiple notes fast. Might need mutex? Haven't pinpointed where the error comes from.
- [ ] Need to softcode parameters for the synth
- [ ] Need to restructure Synth and Voice classes in a more logic/readable way (Synth now is only a wrapper)