"use client";
import React from 'react';

export default function Home() {
  return (
      <div id="main">
        <Description />
        <Demostration />
      </div>
  );
}

function Description() {
  // const 
  return (
    <div id="description">
      <div id="section">
        <h2>What Does it Do?</h2>
        <p>
to be upd
        </p>
      </div>
      <div id="section">
        <h2>How is it Done?</h2>
        <h3>1. Data Processing</h3>
        <p>
to be upd
        </p>
        <h3>2. Music</h3>
        <p>
to be upd
        </p>
      </div>
    </div>
  );
}

function Demostration() {
  return (
    <div id="demo">
      <h2>Listen to our demos</h2>
      <Imagelink num="01" />
      <Imagelink num="02" />
      <Imagelink num="03" />
    </div>
  );
}
function Imagelink({num}) {
  const imgdesc=[
    "M51 Galaxy",
    "Stephan's Quintet",
    "M1 Crab Nebula"
  ]
  const imgurl=[
    "01.jpg",
    "02.png",
    "03.png"
  ]
  return (
    <div><a href={"/data/"+num+"/"} id="imglink">
      <img src={"/image/"+imgurl[num-1]}></img>
      <p>{imgdesc[num-1]}</p>
    </a></div>
  );
}
