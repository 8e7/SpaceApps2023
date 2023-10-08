# A Sonic Dash Through the Cosmos
NASA Space Apps 2023 Submission, by team Ten Hours Of Space Music For Sleeping.

[Website Here](https://space-apps2023.vercel.app/)

[Space Apps Homepage](https://www.spaceappschallenge.org/2023/find-a-team/ten-hours-of-space-music-for-sleeping/)

## Introduction

We created a brand new way of data sonification. We developed a highly interactive web app, that can deliver rich scientific information from space, while allowing users to choose their own path of exploration. 
Using our web app, people can drag the cursor to form a path on a photo of a galaxy. A music snippet would then be played to show what you might experience while traveling along that path.
We stored intensity information from WISE telescope data into each pixel, and assigned data values of intensities, wave lengths, variance to sound frequencies, volumes, chords, and even the instruments.
This application could improve the general public's intepretation on complex numerical scientific data without doing the data analysis themselves, and keep them engaged with this new learning experience.


## Local Hosting
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

(Copypaste part from vercel tutorial)

First, install necessary packages:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## References

### Coding Environments
* python 3.11
    * pandas
    * numpy
### Website Packages
* next.js, with website deployed by Vercel
    * React
* node.js
* tone.js (Web sound API)
* SWR (Client-Side data fetching)