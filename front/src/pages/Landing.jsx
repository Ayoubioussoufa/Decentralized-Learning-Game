import { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import TextAndModel from '../components/TextAndModel.jsx'
import Interactive from '../components/Interactive.jsx'
import Footer from '../components/Footer.jsx'
import StayUpdated from '../components/StayUpdated.jsx'
import WhyDiff from '../components/WhyDiff.jsx'

function Landing() {

  return (
    <>
      <NavBar/>
      <TextAndModel/>
      <WhyDiff/>
      <Interactive/>
      <StayUpdated/>
      <Footer/>
    </>
  )
}

export default Landing