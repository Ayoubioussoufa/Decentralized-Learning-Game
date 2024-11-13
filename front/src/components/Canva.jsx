import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Model from "./Model.jsx";


function Canva() {
  return (
    <>
        <Canvas>
            {/* <Suspense fallback={null}> */}
              <directionalLight position={[5, 5, 5]} intensity={2}/>
              <Model />
              <OrbitControls />
            {/* </Suspense> */}
          </Canvas>
    </>
  )
}

export default Canva