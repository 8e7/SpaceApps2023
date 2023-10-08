"use client";
import { useState } from 'react'
import * as Tone from 'tone'

export function play_music(synth) {
    synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
}

// export 


//const root_notes = ["C3", "G3", "E4", "B4"];

export const default_volumes = [+5, +5, +5, +5];
export const max_volumes = [+15, +15, +10, +10];

const scale = ["C", "D", "E", "F", "G", "A", "B"];
function convert_note(x) {
    const scale_num = scale.length;
    let note = scale[x % scale_num];
    let oct = x / scale_num + 1;
    if (oct <= 0) {
        console.log(oct);
    }
    let res = note + oct;
    return res;
}

const minimum_move_distance = 4;
const maximum_hold_time = 4;
export function play_path(synths, path, grid, gridSize) {
    let len = path.length;
    if (len === 0 || !grid) {
        
        return;
    }
    console.log("Playing");
    Tone.Transport.stop();
    Tone.Transport.cancel();
    let [n, m] = gridSize;
    let prev_pos = [];
    let last_times = Array(4, 0);
    let last_notes = Array(4, null);
    let total_time = Tone.Time(0);
    
    let change_bpm = (new_bpm) =>{
        Tone.Transport.bpm.value = new_bpm;
    };

    for (let i = 0; i < 4; i++) {
        synths[i].sync();
    }    
    let note_cnt = 0;
    for (let i = 0; i < len; i++) {
        if (!path[i]) continue;
        let [x, y] = path[i];
        if (!grid[x] || !grid[x][y]) continue;
        // cur_mouse=[i,cliPath[i][0],cliPath[i][1]];
        let newNote = true;
        if (i > 0) {
            //const bpm_multiplier = 2;
            let dis_to_prev = Math.hypot(path[i][0] - prev_pos[0], path[i][1] - prev_pos[1]);
            
            if (dis_to_prev < minimum_move_distance) {
                newNote = false; 
            } else {
                prev_pos = path[i];
            }
        } else {
            prev_pos = path[i];
        }
        if (newNote) {
            note_cnt++;
            console.log(note_cnt);
            let notes = grid[x][y].slice(0, 4);
            let volumes = [grid[x][y][4], grid[x][y][5], grid[x][y][5], grid[x][y][5]];
            //console.log(notes);
            console.log(volumes[0]);

            for (let j = 0; j < 4; j++) {
                if (notes[j] != last_notes[j] || 
                    last_times[j] < note_cnt-maximum_hold_time) {
                    last_times[j] = note_cnt;
                    if (last_notes[j]) {
                        Tone.Transport.scheduleOnce(() => {synths[j].triggerRelease()}, total_time - 0.01);
                    }
                    last_notes[j] = notes[j]
                    if (notes[j]) {
                        if (j >= 2) {
                            notes[j] += 7;
                        }
                        Tone.Transport.scheduleOnce(() => { synths[j].triggerAttack(convert_note(notes[j])) }, total_time);
                    }
                }
                //console.log(!notes[i]);
                if (!notes[j]) continue;

                let intensity = (volumes[j] - 42.5) * 4 + default_volumes[j];
                intensity = Math.min(intensity, max_volumes[j]);
                //console.log(intensity);
                Tone.Transport.scheduleOnce(() => {
                    synths[j].volume.linearRampTo(intensity, "4n");
                }, total_time);
            }

            total_time += Tone.Time("4n").toSeconds();
        }
    }
    Tone.Transport.start();
    
    // TonBeat(time,cliPath);
}

//play() // call this when someone interacts with your program.
