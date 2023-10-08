"use client";
import { useState } from 'react'
import * as Tone from 'tone'

//const synth = new Tone.Synth().toDestination();

//TODO: instantiate the synth into useeffect


export function play_music(synth) {
    synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
}

const root_notes = ["C2", "G3", "D4", "A4"];
const notes = [

];
export function play_path(synths, path, grid, gridSize) {
    let len = path.length;
    if (len === 0) {
        return;
    }
    console.log("Playing");
    Tone.Transport.stop();
    Tone.Transport.cancel();
    let [n, m] = gridSize;
    let total_time = 0;
    
    let change_bpm = (new_bpm) =>{
        Tone.Transport.bpm.value = new_bpm;
    };

    for (let i = 0;i < len;i++) {
        let [x, y] = path[i];
        if (i) {
            const bpm_multiplier = 2;
            let speed = Math.hypot(path[i][0]-path[i-1][0], path[i][1]-path[i-1][1]);
            Tone.Transport.scheduleOnce(change_bpm(50+speed*bpm_multiplier), total_time);
            //change_bpm.start(total_time); 
        }
        
        let wave = grid[x][y];
        const maxValue = Math.max(...wave);
        const maxInd = wave.indexOf(maxValue);
        Tone.Transport.scheduleOnce(() =>{synths[maxInd].triggerAttackRelease(root_notes[maxInd], "8n")}, total_time);
        total_time += Tone.Time("8n").toSeconds();
    }
    Tone.Transport.start();
}
//play() // call this when someone interacts with your program.
