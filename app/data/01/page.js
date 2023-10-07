"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
import pic from './milky-way-2695569_1280.jpg'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import jsonData from './m31pro.json'
import * as music from '../../library/music.mjs'
import * as Tone from 'tone'

const sample_files = [
  { pitch: 'A2', filename: 'cello_A2.mp3' },
  { pitch: 'C4', filename: 'piano_C4.mp3' },
  { pitch: 'A4', filename: 'violin_A4.mp3' },
  { pitch: 'A5', filename: 'flute_A5.mp3' },
  // Add more tuples as needed
];
function SpaceImage() {
  const [initMusic, setInitMusic] = useState(false);
  const [loadedSamples, setLoadedSamples] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0]);  
  const [mouseHold, setMouseHold] = useState(false);
  const [imageSize, setImageSize] = useState();
  const gridSize = [100, 100]; //this should be same as data size

  const [gridData, setGridData] = useState(() => {
    //initializes grid data
    const { xSize, ySize } = gridSize;
    const array2D = Array.from({ length: xSize }, () =>
      Array.from({ length: ySize }, () => null)
    );

    jsonData.forEach(element => {
      const { px, py, w1n, w2n, w3n, w4n } = element;
      if (px >= 0 && px < xSize && py >= 0 && py < ySize) {
        array2D[px][py] = [w1n, w2n, w3n, w4n];
      }
    });
    return array2D;
  });

  const [path, setPath] = useState(Array(0));
  const [synths, setSynths] = useState(); //each synth is a sampler

  useEffect(() => { 
    if (initMusic === true) {
      
      const cello = new Tone.Sampler({
          urls: {A2: "cello_A2.mp3"},baseUrl: "/samples/",
        }).toDestination();
      const piano = new Tone.Sampler({
          urls: {C4: "piano_C4.mp3"},baseUrl: "/samples/",
        }).toDestination();
      const violin = new Tone.Sampler({
          urls: {A4: "violin_A4.mp3"},baseUrl: "/samples/",
        }).toDestination();
      const flute = new Tone.Sampler({
          urls: {A5: "flute_A5.mp3"},baseUrl: "/samples/",
        }).toDestination();
      let newSynths = [cello, piano, violin, flute];
      /*
      const newSynths = sample_files.map(({pitch, fileName}) => {
        const sampler = new Tone.Sampler({
          urls: {
            [pitch]: fileName
          },
          baseUrl: "/samples/",
        }).toDestination();
        return sampler;
      });
      */
      setLoadedSamples(true);
      console.log(newSynths);
      setSynths(newSynths);
      Tone.start();
    }
  }, [initMusic]);

  function mousedown(e){
    setMouseHold(true);
    if (initMusic === false) {
      setInitMusic(true);
    }
  }
  function mouseup(e) {
    setMouseHold(false);
    console.log(path);
    if (loadedSamples === true) {
      music.play_music(synths[0]);
    }
    setPath(Array(0)); //clears path
  }
  function mousemove(e) {
    if (mouseHold) {
      const target = e.target;
      const rect = target.getBoundingClientRect();
      setImageSize([rect.right - rect.left, rect.bottom - rect.top]);

      let pos = [(e.clientX - rect.left)/imageSize[0], (e.clientY - rect.top)/imageSize[1]];
      pos = [Math.floor(pos[0] * gridSize[0]), Math.floor((1-pos[1]) * gridSize[1])];
      setMousePos(pos);
      console.log(mousePos);
      const nextPath = [...path, mousePos];
      setPath(nextPath);
    }
  }
  const main_img = (<div style={{ display: 'flex', flexDirection: 'column' }} 
    onMouseDown={mousedown} 
    onMouseUp={mouseup} 
    onMouseMove={mousemove}
    onMouseLeave={mouseup}
    onDragStart={(e) => {e.preventDefault();}} >
    <img src='/image/01.jpg'></img>
  </div>);
  
  return (
    <div id="image-display-box">
      {main_img}
    </div>
  );
}

function HowtoPlay(){
  return (
    <div id="howtoplay">
      <h3>play guide</h3>
      <p>how to play</p>
    </div>
  );
}

export default function Home() {
  return (
    <div id="demo-main">
      <SpaceImage />
      <HowtoPlay />
    </div>
  );
}