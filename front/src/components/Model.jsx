import React from "react";
import { useGLTF } from "@react-three/drei";

const Model = () => {
    const { scene } = useGLTF('/assets/ethereum_logo_3d.glb')
    return <primitive object={scene} scale={3}/>
};

export default Model;
