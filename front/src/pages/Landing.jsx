import { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import TextAndModel from '../components/TextAndModel.jsx'
import Interactive from '../components/Interactive.jsx'
import Footer from '../components/Footer.jsx'
import StayUpdated from '../components/StayUpdated.jsx'
import WhyDiff from '../components/WhyDiff.jsx'

function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <NavBar/>
      <main className="flex-grow w-full max-w-[1120px] mx-auto px-4">
        <TextAndModel/>
        <WhyDiff/>
        <Interactive/>
        <StayUpdated/>
      </main>
      <Footer/>
    </div>
  )
}

export default Landing