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
        <h2>Summary</h2>
        <p>
        We created a brand new way of data sonification. We developed a highly interactive web app, that can deliver rich scientific information from space, while allowing users to choose their own path of exploration.
Using our web app, people can drag the cursor to form a path on a photo of a galaxy. A music snippet would then be played to show what you might experience while traveling along that path.
We stored intensity information from WISE telescope data into each pixel, and assigned data values of intensities, wave lengths, variance to sound frequencies, volumes, chords, and even the instruments.
This application could improve the general public’s intepretation on complex numerical scientific data without doing the data analysis themselves, and keep them engaged with this new learning experience.
        </p>
      </div>
      <div id="section">
        <h2>Project Details</h2>
        <h3>A. Background and Goals</h3>
        <p>
        The high variety of astronomical data provides us exciting views of our universe in different wavelengths; however, the complexcity of those numerical data is intimidating to the general public. Sonification might be the way the branch non-scientists to the beauty of astronomical events. Even though many sonification projects and tools have been designed, they generally only consider 2-dimensional datsets, and are not interactive. The music that is associated to the image is often pre-assigned.
        </p>
        <p>
        This is where we come in. Our purpose is to significantly enhance the listening experience, by increasing the dimension of the datacube (in our case, 2 spatial dimensions + 4 color dimensions), and also providing infinite ways of traveling through the image. The users get to choose the path to explore! Our goal is to simulate a "fly by" with immersive sounds, and a listening path that users can have total control of based on their curiosity. The music slices will provide both scientifical meaning and emotional comfortness. We hope that our work can take data sonification to a whole new level.
        </p>
        <h3>Producing Music</h3>
        <h4>1. Data</h4>
        <p>
        The WISE telescope provides high quality infrared images of the entire sky. We chose a couple sources of interest (including galaxies and nebulae) and obtain their 4-band  photometric data from the NASA/IPAC Infrared Science Archive (The four bands are 3.4, 4.6, 12, 22 μm). We then use GIMP to generate rgb images of the sources, and use a python script to build a reduction pipeline to turn the raw images into csvs that carry essential information for music. 
        </p>
        <img src="/image/liucheng.png"></img>
        <h4>2. Sonification</h4>
        <h5>When a path is determined, the line integral produces a specific music snippet.</h5>
        <p>
!!!to be upd
        </p>
        <h4>3. The User Interface</h4>
        <p>
        The user has three astronomical sources to choose from: M51(the Whrilpool Galaxy), NGC7320(Stephan’s Quintet), and M1(the Crab Nebula). In each of them, the user will see an image of the structure, then they can interact with the image by holding the left click on their mouse and dragging it along an arbitrary path on the image. A yellow trail appears which corresponds to the trail that the user has drawn. Once the user lets go of their mouse, the website calculates the sonification of the path that was traversed. It then plays the resulting melodies.
        </p>
        <h3>C. How is it useful?</h3>
        <p>
to be upd
        </p>
        <h3>D. How does it benefit the community?</h3>
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
