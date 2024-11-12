import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Canva from "./Canva.jsx";

function TextAndModel() {
  return (
    <>
      <div className="max-w-7xl h-[40vh] text-white mx-auto grid grid-cols-2">
          <div className="h-full">
            <h1 className="m-6 p-6 font-bold text-5xl">Learn to Code Blockchain DApps by Building Simple Games </h1>
            <p className="m-6 p-6 text-lg font-medium">CryptoZombies is an interactive school that teaches you all things technical about blockchains. Learn to write smart contracts by making your own crypto-collectibles game. </p>
            <a className="m-6 p-3 bg-gold border-solid rounded hover:text-black" href="#start">Courses</a>
          </div>
          <div className="h-full p-5">
            <Canva />
          </div>
      </div>
    </>
  );
}

export default TextAndModel;
