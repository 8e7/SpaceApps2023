"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
import { InferGetStaticPropsType, GetStaticProps } from 'next'

function SpaceImage({gridData}) {
  return (
    <div id="image-display-box">
      <div id="detect-box">
        {/* <div id="mouseicon"></div> */}
        <img src='/image/02.png'></img>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <div id="leftpart">
      <SpaceImage />
      <div id="section">
        <h3>About NGC-7320</h3>
        <p>
        NGC-7320 is a spiral galaxy lies at the distance of 39 million light years. It has a region where the star formation rate is high. It’s a member of Stephan Quintet but it’s not the actual member of the galaxy group. Other member of the galaxy group is much further away from it.
        </p>
      </div>
    </div>
  );
}