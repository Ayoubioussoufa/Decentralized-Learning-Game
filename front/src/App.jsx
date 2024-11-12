import { useState } from 'react'
import NavBar from './NavBar.jsx'
import TextAndModel from './TextAndModel.jsx'
import ModelAndText from './ModelAndText.jsx'
import Footer from './Footer.jsx'

function App() {

  return (
    <>
      <NavBar/>
      <TextAndModel/>
      {/* <ModelAndText/> */}
      <Footer/>
    </>
  )
}

export default App
