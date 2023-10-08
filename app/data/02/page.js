"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
//import jsonData from './data.json'
import * as music from '../../library/music.mjs'
import * as Tone from 'tone'
import useSWR from 'swr';

const gridSize = [438, 438];

function SpaceImage({gridData}) {
  const [initMusic, setInitMusic] = useState(false);
  const [loadedSamples, setLoadedSamples] = useState(false);
  const [mouseHold, setMouseHold] = useState(false);
  const [clipath, setClipath]=useState(Array(0));
  const [synths, setSynths] = useState(); //each synth is a sampler


  useEffect(() => { 
    if (initMusic === true && loadedSamples == false) {
      let build = async () => {
        const cello = new Tone.Sampler({
          urls: { A2: "cello_A2.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        cello.volume.value = music.default_volumes[0];
        //let cellos = [cello, cello, cello, cello];

        const piano = new Tone.Sampler({
          urls: { C4: "piano_C4.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        piano.volume.value = music.default_volumes[1];
        //let pianos = [piano, piano, piano, piano];

        const violin = new Tone.Sampler({
          urls: { A4: "violin_A4.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        violin.volume.value = music.default_volumes[2];
        //let violins = [violin, violin, violin, violin];

        const flute = new Tone.Sampler({
          urls: { A5: "flute_A5.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        violin.volume.value = music.default_volumes[3];
        //let flutes = [flute, flute, flute, flute];

        let newSynths = [cello, cello, violin, violin];
        await Tone.start();
        setLoadedSamples(true);
        setSynths(newSynths);
      }
      build()
    }
  }, [initMusic]);

  function mousedown(e){
    setClipath(Array(0));
    setMouseHold(true);
    if (initMusic === false) {
      setInitMusic(true);
    }
  }
  function mouseup(e) {
    if (loadedSamples === true && mouseHold === true) {
      setMouseHold(false);
      //console.log(gridData);
      const target = e.target;
      const rect = target.getBoundingClientRect();
      let imageSize = [rect.right - rect.left, rect.bottom - rect.top];
      let path = clipath.map((p) => {
        let pos = [(p[0] - rect.left - window.screenX)/imageSize[0], (p[1] - rect.top - window.screenY)/imageSize[1]];
        pos = [Math.max(0, Math.min(1, pos[0])), Math.max(0, Math.min(1, pos[0]))]
        pos = [Math.floor(pos[0] * gridSize[0]), Math.floor((1-pos[1]) * gridSize[1])];
        return pos;
      });
      music.play_path(synths, path, gridData, gridSize);
    }
    setMouseHold(false);
  }
  function mousemove(e) {
    if (mouseHold) {
      const target = e.target;
      const rect = target.getBoundingClientRect();
      
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        return;
      }

      const newClipath=[...clipath,[e.clientX+window.screenX,e.clientY+window.scrollY]];
      setClipath(newClipath);
      //console.log(clipath.length)
    }
  }
  
  return (
    <div id = "image-display-box"><div id = "detect-box"
    onMouseDown={mousedown} 
    onMouseUp={mouseup}
    onMouseMove={mousemove}
    onMouseLeave={mouseup}
    onDragStart={(e) => {e.preventDefault();}}>
      {clipath.map((poss,index) => {
        let [x, y] = poss;
        return (<div id="mouseicon" key={index} style={{top: y, left: x}}></div>);
      })}
      <img src = '/image/02.png'></img>
    </div></div>
  );
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Home() {
  const [gridData, setGridData] = useState(Array(gridSize[0]).fill().map(()=>Array(gridSize[1]).fill()));
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data, error } = useSWR('/data/ngc.json', fetcher)
  if (dataLoaded === false && (!error) && data) {
    setDataLoaded(true);
    const [xSize, ySize] = gridSize;
    let array2D = Array(xSize).fill().map(() => Array(ySize).fill())
    for (var index in data) {
      let elem = data[index];
      if (elem.px >= 0 && elem.px < xSize && elem.py >= 0 && elem.py < ySize) {
        array2D[elem.px][elem.py] = [elem.base_note, elem.chord_note[0], elem.chord_note[1], elem.chord_note[2], elem.vol_base_note, elem.vol_base_note];
      }
    }
    setGridData(array2D);
    // console.log("Complete Init");
  }
  return (
    <div id="leftpart">
      <SpaceImage gridData={gridData}/>
      <div id="section">
        <h3>About NGC-7320</h3>
        <p>
        NGC-7320 is a spiral galaxy lies at the distance of 39 million light years. It has a region where the star formation rate is high. It&apos;s a member of Stephan Quintet but it&apos;s not the actual member of the galaxy group. Other member of the galaxy group is much further away from it.
        </p>
        <h5>The image is provided by JWST</h5>
      </div>
    </div>
  );
}