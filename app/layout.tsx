import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ten Hours Of Space Music For Sleeping',
  description: 'Space Apps 2023',
}

function Titlebar() {
  return (
    <div id="titlebar">
      <h1>Ten Hours Of Space Music For Sleeping</h1>
      <h4>Authors: Ting-An Wang, Jhao-Syun Lai, Tuan-Lin Chang, You-Hsuan Chen, Yu-Ciao Liao</h4>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        <Titlebar />
        {children}
      </body>
    </html>
  )
}

