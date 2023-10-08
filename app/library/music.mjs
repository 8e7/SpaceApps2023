"use client";
import { useState } from 'react'
import * as Tone from 'tone'

//const synth = new Tone.Synth().toDestination();

//TODO: instantiate the synth into useeffect


const notes = [
    { pitch: "C4", timing: 0 },
    { pitch: "E4", timing: 0 },
    { pitch: "G4", timing: 0 }
];


export function play_music(synth) {
    synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
}

const root_notes = ["C2", "G3", "D4", "A4"];
export function play_path(synths, path, grid, gridSize) {
    let len = path.length;
    if (len === 0) {
        return;
    }
    let [n, m] = gridSize;
    let total_time = 0;
    for (let i = 0;i < len;i++) {
        let [x, y] = path[i];
        let wave = grid[x][y];
        const maxValue = Math.max(...wave);
        const maxInd = wave.indexOf(maxValue);
        Tone.Transport.scheduleOnce(synths[maxInd].triggerAttackRelease(root_notes[maxInd], "8n"), total_time); 
        total_time += Tone.Time("8n").toSeconds();
    }
    Tone.Transport.start();
}
//play() // call this when someone interacts with your program.
