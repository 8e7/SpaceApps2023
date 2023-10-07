"use client";
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  return (
    <body>
      <Titlebar />
      <div id="main">
        <Description />
        <Demostration />
      </div>
    </body>
  );
}

function Titlebar() {
  return (
    <div id="titlebar">
      <h1>Ten Hours Of Space Music For Sleeping</h1>
      <h4>Authors: ...</h4>
    </div>
  );
}
function Description() {
  return (
    <div id="description">
      <h2>Idea</h2>
      <p>
The webapp shows a preloaded image of space, the user interacts with the image by dragging the mouse to form a path, then audio is played according to a traversal of the path.
      </p>
      <p>
Each pixel has data on the intensities of certain frequencies. Our current idea is to take the strongest frequency bands, map them into musical notes, and create a chord. 
      </p>
      <p>
There will be some points (stars) to consider. The path has to find the closest point(s) to form the sound that is represented. 
      </p>
    </div>
  );
}

function Demostration() {
  return (
    <div id="demo">
      <h2>Listen to our demos</h2>
      <Imagelink num="0" />
      <Imagelink num="1" />
    </div>
  );
}
// title="image 1" 
function Imagelink({num}) {
  const links=[
    "https://i.imgur.com/lxzSeAZ.gif",
    "https://i.imgur.com/No8wupF.gif"
  ]
  return (
    <div id="imglink">
      <img src={links[num]}></img>
      <p>image {num}</p>
    </div>
  );
}
