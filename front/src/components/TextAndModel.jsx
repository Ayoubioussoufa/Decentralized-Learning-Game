import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Canva from "./Canva.jsx";

function TextAndModel() {
  return (
    <>
      <div className="mt-8 max-w-7xl text-white mx-auto grid md:grid-cols-2 justify-items-center items-center">
          <div className="p-6 h-full">
            <h1 className="font-bold text-2xl sm:text-5xl">Level Up Your Solidity Skills with Interactive Challenges !</h1>
            <p className="mt-10 text-lg font-medium text-gray2">Welcome to AyBiouss ! Dive into the world of blockchain development with a hands-on, gamified approach to learning Solidity. Through challenges, interactive code battles, and rewards, you’ll progress from beginner to expert in no time. </p>
            <div className="mt-10">
            <a className="p-3 bg-gold border-solid rounded hover:text-black" href="#start">Start Your Journey</a>
            </div>
          </div>
          <div className="h-full p-5">
            <Canva />
          </div>
      </div>
    </>
  );
}

export default TextAndModel;
