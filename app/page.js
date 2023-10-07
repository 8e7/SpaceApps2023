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

function Description({ fileContent }) {
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
      <Imagelink num="01" />
      <Imagelink num="02" />
      {/* <Imagelink num="03" /> */}
    </div>
  );
}
function Imagelink({num}) {
  return (
    <div><a href={"/data/"+num+"/"} id="imglink">
      <img src={"/image/"+num+".jpg"}></img>
      <p>image {num}.</p>
    </a></div>
  );
}
