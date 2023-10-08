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
        <img src='/image/03.png'></img>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <div id="leftpart">
      <SpaceImage />
      <div id="section">
        <h3>About M1 Crab Nebula</h3>
        <p>
        M1, also known as Crab Nebula, is a supernova remanat with a pulsar star at the center. Its central pulsar star keeps emitting high-energy gamma ray and in 2019, we received phtons with energy higher than 100TeV. The Crab Nebula is currently expanding outward at the speed of 1500km/s and studies of it help us get a better understanding of the dynamics of supernova remanat.
        </p>
      </div>
    </div>
  );
}