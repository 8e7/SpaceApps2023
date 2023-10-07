"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
import { InferGetStaticPropsType, GetStaticProps } from 'next'

function SpaceImage() {
  const main_img = (<div style={{ display: 'flex', flexDirection: 'column' }}>
    <img src='/image/02.jpg'></img>
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