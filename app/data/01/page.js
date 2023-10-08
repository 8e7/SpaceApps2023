"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
//import jsonData from './data.json'
import * as music from '../../library/music.mjs'
import * as Tone from 'tone'
import useSWR from 'swr';


const gridSize = [438, 438]; //this should be same as data size
const sample_files = [
  { pitch: 'A2', filename: 'cello_A2.mp3' },
  { pitch: 'C4', filename: 'piano_C4.mp3' },
  { pitch: 'A4', filename: 'violin_A4.mp3' },
  { pitch: 'A5', filename: 'flute_A5.mp3' },
  // Add more tuples as needed
];

function SpaceImage({gridData}) {
  const [initMusic, setInitMusic] = useState(false);
  const [loadedSamples, setLoadedSamples] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0]);  
  const [mouseHold, setMouseHold] = useState(false);

  const [path, setPath] = useState(Array(0));
  const [clipath, setClipath]=useState(Array(0));
  const [synths, setSynths] = useState(); //each synth is a sampler

  useEffect(() => { 
    if (initMusic === true && loadedSamples == false) {
      let build = async () => {
        const cello = new Tone.Sampler({
          urls: { A2: "cello_A2.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        cello.volume.value = music.default_volumes[0];
        let cellos = [cello, cello, cello, cello];

        const piano = new Tone.Sampler({
          urls: { C4: "piano_C4.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        piano.volume.value = music.default_volumes[1];
        let pianos = [piano, piano, piano, piano];

        const violin = new Tone.Sampler({
          urls: { A4: "violin_A4.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        violin.volume.value = music.default_volumes[2];

        let violins = [violin, violin, violin, violin];

        const flute = new Tone.Sampler({
          urls: { A5: "flute_A5.mp3" }, baseUrl: "/samples/",
        }).toDestination();
        violin.volume.value = music.default_volumes[3];
        let flutes = [flute, flute, flute, flute];
        let newSynths = [cellos, pianos, violins, flutes];
        await Tone.start();
        setLoadedSamples(true);
        //console.log(newSynths);
        setSynths(newSynths);
      }
      build()
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
    if (loadedSamples === true) {
      console.log(gridData);
      music.play_path(synths, path, gridData, gridSize);
    }
    setPath(Array(0)); //clears path
    setClipath(Array(0));
  }
  function mousemove(e) {
    if (mouseHold) {
      const target = e.target;
      const rect = target.getBoundingClientRect();
      let imageSize = [rect.right - rect.left, rect.bottom - rect.top];
      //todo!!
      const newClipath=[...clipath,[e.clientX+window.screenX,e.clientY+window.scrollY]];
      setClipath(newClipath);
      //console.log(clipath.length)
      //end todo
      let pos = [(e.clientX - rect.left)/imageSize[0], (e.clientY - rect.top)/imageSize[1]];
      pos = [Math.floor(pos[0] * gridSize[0]), Math.floor((1-pos[1]) * gridSize[1])];
      setMousePos(pos);
      // console.log(mousePos);
      const nextPath = [...path, mousePos];
      setPath(nextPath);
    }
  }
  return (
    <div id="image-display-box"><div id="detect-box"
    onMouseDown={mousedown} 
    onMouseUp={mouseup}
    onMouseMove={mousemove}
    onMouseLeave={mouseup}
    onDragStart={(e) => {e.preventDefault();}}>
      {clipath.map((poss,index)=>{
        let [x,y]=poss;
        return (<div id="mouseicon" key={index} style={{top: y, left: x}}></div>);
      })}
      <img src='/image/01.jpg'></img>
    </div></div>
  );
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Home() {
  const [gridData, setGridData] = useState(Array(gridSize[0]).fill().map(()=>Array(gridSize[1]).fill()));
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data , error } = useSWR('/data/version2.json', fetcher)
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
    <SpaceImage gridData={gridData}/>
  );
}