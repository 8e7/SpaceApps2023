"use client";
import { useState } from 'react'
import Image from 'next/image'
import pic from './milky-way-2695569_1280.jpg'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import jsonData from './m31pro.json'



export default function Page() {
  const [mousePos, setMousePos] = useState([0, 0]);  
  const [mouseHold, setMouseHold] = useState(false);
  const [imageSize, setImageSize] = useState();
  const gridSize = [100, 100];
  const [gridData, setGridData] = useState(() => {
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

  function mousedown(e){
    setMouseHold(true);
  }
  function mouseup(e) {
    setMouseHold(false);
  }
  function mousemove(e) {
    if (mouseHold) {
      const target = e.target;
      const rect = target.getBoundingClientRect();
      setImageSize([rect.right - rect.left, rect.bottom - rect.top]);
      setMousePos([(e.clientX - rect.left)/imageSize[0], (e.clientY - rect.top)/imageSize[1]]);
      console.log(mousePos);
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