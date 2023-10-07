"use client";
import { useState } from 'react'
import * as Tone from 'tone'

//const synth = new Tone.Synth().toDestination();

//TODO: instantiate the synth into useeffect
const synth = new Tone.PolySynth().toDestination();

const notes = [
    { pitch: "C4", timing: 0 },
    //{ pitch: "D4", timing: 0 },
    { pitch: "E4", timing: 0 },
    //{ pitch: "F4", timing: 0 },
    { pitch: "G4", timing: 0 }
];

export function play_music() {
    synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
}

//play() // call this when someone interacts with your program.
