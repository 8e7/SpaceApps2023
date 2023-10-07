"use client";
import { useState } from 'react'
import * as Tone from 'tone'

//const synth = new Tone.Synth().toDestination();

const synth = new Tone.PolySynth(3, Tone.Synth, {
    oscillator : {
      type : "sawtooth"
    }
  }).toDestination();

const notes = [
    { pitch: "C4", timing: 0 },
    { pitch: "D4", timing: 0 },
    { pitch: "E4", timing: 0 },
    { pitch: "F4", timing: 0 },
    { pitch: "G4", timing: 0 }
];

export function play_music() {
    let delay = Tone.now();
    for(let i = 0; i < notes.length; i++) {
        delay += notes[i].timing;
        synth.triggerAttackRelease(notes[i].pitch, '8n', delay);  
    }
}

//play() // call this when someone interacts with your program.
