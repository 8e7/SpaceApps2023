"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
import pic from './milky-way-2695569_1280.jpg'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import jsonData from './m31pro.json'
import * as music from '../../library/music.mjs'
import * as Tone from 'tone'

export default function Page() {
  const [initMusic, setInitMusic] = useState(false);
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

      const newSynths = new Tone.Sampler({
        urls: {
          A2: "cello_A2.mp3"
        },
        baseUrl: "/samples/"
      }).toDestination();
      setSampler(newSampler);
      Tone.start();
    }
  }, [initMusic]);

  function mousedown(e){
    if (initMusic === false) {
      setInitMusic(true);
    }
    setMouseHold(true);
  }
  function mouseup(e) {
    setMouseHold(false);
    console.log(path);
    music.play_music(sampler);
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
  const main_img = (<div style={{ display: 'flex', flexDirection: 'column' }} onMouseDown={mousedown} onMouseUp={mouseup} onMouseMove={mousemove}
    onMouseLeave={mouseup}
    onDragStart={(e) => {e.preventDefault();}} >
      <Image src={pic} alt="Space image" onLoadingComplete={(e) => {
        const rect = e.getBoundingClientRect();
        setImageSize([rect.right - rect.left, rect.bottom - rect.top]);
      }}/>
    </div>);
  
  return (
    <>
      {main_img}
    </>
  )
}