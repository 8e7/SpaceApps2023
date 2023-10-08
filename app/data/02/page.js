"use client";
import { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image'
import { InferGetStaticPropsType, GetStaticProps } from 'next'

function SpaceImage() {
  return (
    <div id="image-display-box">
      <div id="detect-box">
        <div id="mouseicon"></div>
        <img src='/image/02.jpg'></img>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <SpaceImage />
  );
}