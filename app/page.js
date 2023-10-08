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
This application could improve the general public&apos;s intepretation on complex numerical scientific data without doing the data analysis themselves, and keep them engaged with this new learning experience.
        </p>
      </div>
      <div id="section">
        <h2>Project Details</h2>

        <div id="subsection">
          <h3>A. Background and Goals</h3>
          <p>
          The high variety of astronomical data provides us exciting views of our universe in different wavelengths; however, the complexcity of those numerical data is intimidating to the general public. Sonification might be the way the branch non-scientists to the beauty of astronomical events. Even though many sonification projects and tools have been designed, they generally only consider 2-dimensional datsets, and are not interactive. The music that is associated to the image is often pre-assigned.
          </p>
          <p>
          This is where we come in. Our purpose is to significantly enhance the listening experience, by increasing the dimension of the datacube (in our case, 2 spatial dimensions + 4 color dimensions), and also providing infinite ways of traveling through the image. The users get to choose the path to explore! Our goal is to simulate a &quot;fly by&quot; with immersive sounds, and a listening path that users can have total control of based on their curiosity. The music slices will provide both scientifical meaning and emotional comfortness. We hope that our work can take data sonification to a whole new level.
          </p>
        </div>

        <div id="subsection">
          <h3>B. Producing Music</h3>
          <h4>1. Data</h4>
          <p>
          The WISE telescope provides high quality infrared images of the entire sky. We chose a couple sources of interest (including galaxies and nebulae) and obtain their 4-band  photometric data from the NASA/IPAC Infrared Science Archive (The four bands are 3.4, 4.6, 12, 22 μm). We then use GIMP to generate rgb images of the sources, and use a python script to build a reduction pipeline to turn the raw images into csvs that carry essential information for music. 
          </p>
          <div id="imgbox"><img src="/image/liucheng.png"></img></div>
          <h4>2. Sonification</h4>
          <h5>When a path is determined, the line integral produces a specific music snippet.</h5>
          <p>
          The WISE telescope provides intensity measurements of our source in four bands: 3.4, 4.6, 12, and 22 μm. Three sources of sound: the base, the bass, and the chord will be assigned to each pixel in the image. Briefly speaking:
          </p>
          <p>
          The Base Note is the dominant key, it corresponds to the weighted wavelength (see 1. Base Note for details). The longer the wavelength (redder), the higher the note; the shorter the wavelength (bluer), the lower the note. Also, the higher the intensity, the higher the volume.
          </p>
          <p>
          The Bass Note plays a supportive rule, and it corresponds to the 22 μm band. The higher the photometric intensity, the higer the bass note. The bass plays one octave below the base note
          </p>
          <p>
          The Chord Note is assigned based on the variance between the four normalized intensity of the four bands. High variance indicated strong color differences, we assign chords with higher scale degrees, such as triads and seventh-chords. On the other hand, low variance regions are associated with no chords or only in duals.
          </p>
          <p>
          Generally, the bass and base shares the three common octaves (from C3 to C6), and the chord is sprinkled everywhere. (see figure 2). Detailed explanations for each component is described below:
          </p>
          <h5>a. The Base Note</h5>
          <p>
          In order to represent the “average color” of each pixel, we calaulate the weighted mean of wavelengths in terms of their intensities. The weighted average is then assigned to a musical note. This will be the base note. After that, we do a normalization with respect to the maximum and minimun weighted mean. The note is then assigned to the range from C4 to C6 respevtively (See equation 1 for details) based on the normalized value. All wavelegths can now be sorted within those ranges, and will be represented by the corresponding note. As a result, when flying by bluer areas, higher notes would be played (such as A5), and for redder areas, you would hear lower notes (Such as E4).
          </p>
          <h5>b. The Bass Note</h5>
          <p>
          The bass note represents the 22 μm observation. We produce 8 sub-intervals between the minimum and maximum intensity, and whichever each pixel lands, it will have the corresponding sound (see figure 3). The volume of the bass note will change with the base note.
          </p>
          <h5>c. Chords</h5>
          <p>
          Similar to the method of assigning base notes, we calculate the variance between the normalized intensity of four bands at each pixel. Physically, smaller variance indicates little color difference at that pixel, which in some sence implies that pixel is “boring”, no chords will be played along the base note.
          </p>
          <p>
          On the other hand, bigger variance indicates great color differences, which is in some sence more “exciting”, so the scale degree of the chord will increase correspondingly. For instance, if variance=1 corresponds to triad, variance=3 might correspond to a seventh chord (See figure 4).
          </p>
          <h4>3. The User Interface</h4>
          <p>
          The user has three astronomical sources to choose from: M51(the Whrilpool Galaxy), NGC7320(Stephan&apos;s Quintet), and M1(the Crab Nebula). In each of them, the user will see an image of the structure, then they can interact with the image by holding the left click on their mouse and dragging it along an arbitrary path on the image. A yellow trail appears which corresponds to the trail that the user has drawn. Once the user lets go of their mouse, the website calculates the sonification of the path that was traversed. It then plays the resulting melodies.
          </p>
        </div>

        <div id="subsection">
          <h3>C. How is it useful?</h3>
          <p>
          Comparing to traditional sonification methods, which are not interactive, we offer a new approach. By choosing their own path of sonification, the users can satisfy their curiosity.
          </p>
          <p>
          We have think of five scenarios that this may come in useful:
          </p>
          <h4>1. For the general public:</h4>
          <p>
          Raw astronomical data is intimidating to analyze for amateurs. Although RGB combined images are satisfying to watch, the science content is limited since the high dimensional data is reduced to three. Our approach enables those who are curious to explore data with high dimension is a musical fashion.
          </p>
          <h4>2. For professional astronomers:</h4>
          <p>
          An astrophysicist who studies galaxy evolution may be interested in visualizing the star-formation rate (SFR) in different parts of a galaxy. They can try “sonifying” the SFR distribution, and draw different paths on the image of galaxies. Are the SFR distributed radially? They can draw a path from the center radially stretching outwards and see whether the notes go up or down! Maybe this method of sonifying can inspire new thoughts in astronomy!
          </p>
          <h4>3. For children:</h4>
          <p>
          The images of galaxies, nebulae, and large scale structures are fascinating to children. We believe associating beautiful images to sound may provide a new way of inspiring people embrace science at a younger age.
          </p>
          <h4>4. For students:</h4>
          <p>
          Through our interface, the students can discover different paths on a image, and learn about galaxy structures or color distribution. And of course, the best way to learn is through doing, which is what our webpage can offer.
          </p>
        </div>

        <div id="subsection">
          <h3>D. How does it benefit the community?</h3>
          <p>
          The flexibility of the path choosing is one of our greatest feature, which enables the general public to probe the information along whatever path they want. This provides them a good way to interpret the astronomy data instead of just appreciating the beutiful picture. They can figure out what&apos;s happening inside the galaxy while enjoying the harmonic music. As for education, our app can amuse the class and make the students understand astronomy without coducting hard numerical data analysis.
          </p>
          <p>
          For those who is not familiar with astrophysics, this app could show them the beauty of our universe or even bring them into the field of science.
          </p>
          <p>
          Our app aims at improving people&apos;s knowledge of astronomy through a straightforward approach and boosting their passion for science, which is the most import thing of open science.
          </p>
        </div>
        
      </div>
      <div id="section">
        <h3>References / Environments and Packages</h3>

        <h4>Coding Environments</h4>
        <p>python 3.11</p>
        <p>pandas</p>
        <p>numpy</p>

        <h4>Website Packages</h4>
        <p>next.js, with website deployed by Vercel</p>
        <p>React</p>
        <p>node.js</p>
        <p>tone.js (Web sound API)</p>
        <p>SWR (Client-Side data fetching)</p>
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
