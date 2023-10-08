"use client";
import { useState } from 'react'
import * as Tone from 'tone'

export function play_music(synth) {
    synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
}

//const root_notes = ["C3", "G3", "E4", "B4"];

export const default_volumes = [+5, -15, +5, +5];
export const max_volumes = [+15, 0, +10, +15];

const scale = ["C", "D", "E", "F", "G", "A", "B"];
function convert_note(x) {
    const scale_num = scale.length;
    let note = scale[x % scale_num];
    let oct = x / scale_num + 1;
    let res = note+oct;
    return res;
}

const minimum_move_distance = 4;
export function play_path(synths, path, grid, gridSize) {
    let len = path.length;
    if (len === 0) {
        return;
    }
    console.log("Playing");
    Tone.Transport.stop();
    Tone.Transport.cancel();
    let [n, m] = gridSize;
    let prev_pos = [];
    let last_notes = Array(4, null);
    let total_time = Tone.Time(0);
    
    let change_bpm = (new_bpm) =>{
        Tone.Transport.bpm.value = new_bpm;
    };

    //first sync instruments to Tone.Transport
    for (let i = 0;i < 4;i++) {
        synths[2][i].sync();
    }    
    for (let i = 0; i < len; i++) {
        let [x, y] = path[i];
        let newNote = true;
        if (i) {
            const bpm_multiplier = 2;
            let dis_to_prev = Math.hypot(path[i][0] - prev_pos[0], path[i][1] - prev_pos[1]);
            
            if (dis_to_prev < minimum_move_distance) {
                newNote = false; 
            } else {
                console.log(i);
                prev_pos = path[i];
            }
            //let speed = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
            //Tone.Transport.scheduleOnce(change_bpm(50 + speed * bpm_multiplier), total_time);
        } else {
            prev_pos = path[i];
        }
        if (newNote) {
            let notes = grid[x][y].slice(0, 4);
            let volumes = [grid[x][y][4], grid[x][y][5], grid[x][y][5], grid[x][y][5]];
            //console.log(notes);
            //console.log(volumes);

            for (let j = 0; j < 4; j++) {
                if (notes[j] != last_notes[j]) {
                    if (last_notes[j]) {
                        Tone.Transport.scheduleOnce(() => {synths[2][j].triggerRelease()}, total_time-0.01);
                    }
                    last_notes[j] = notes[j]
                    if (notes[j]) {
                        Tone.Transport.scheduleOnce(() => { synths[2][j].triggerAttack(convert_note(notes[j])) }, total_time);
                    }
                }
                //console.log(!notes[i]);
                if (!notes[j]) continue;

                let intensity = (volumes[j] - 45) * 4 + default_volumes[2];
                intensity = Math.min(intensity, max_volumes[2]);
                //console.log(intensity);
                Tone.Transport.scheduleOnce(() => {
                    synths[2][j].volume.value = intensity;
                }, total_time);
            }

            total_time += Tone.Time("4n").toSeconds();
        }
    }
    Tone.Transport.start();
}
//play() // call this when someone interacts with your program.
