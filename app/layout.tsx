import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Space Apps 2023',
  description: 'Generated by create next app',
}

function Titlebar() {
  return (
    <div id="titlebar">
      <h1>Ten Hours Of Space Music For Sleeping</h1>
      <h4>Authors: ...</h4>
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
      {/* <Titlebar /> */}
      <body className={inter.className}>
        <Titlebar />
        {children}
        {/* <Footerbar /> */}
      </body>
    </html>
  )
}



// export default function Layout({ children }) {
//   return (
//     <>
//       <Titlebar />
//       <main>{children}</main>
//       {/* <Footer /> */}
//     </>
//   )
// }