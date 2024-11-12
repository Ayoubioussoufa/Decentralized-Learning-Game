import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Canva from "./Canva.jsx";

function ModelAndText() {
  return (
    <>
      <div className="max-w-7xl text-white mx-auto bg-red-500">
        <div className="grid grid-cols-2">
          <div>
            <Canva />
          </div>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            ad similique voluptates deleniti sunt quas ratione quam dignissimos
            quod praesentium, facilis, aut voluptate suscipit impedit enim
            harum! Eos id error neque enim, fuga ut ratione, amet cupiditate
            voluptatum nostrum libero reiciendis pariatur aperiam. Repellendus
            provident quas veritatis eos consequuntur laboriosam error
            reiciendis ad nemo, dignissimos, neque tempore sit explicabo
            cupiditate.
          </div>
        </div>
      </div>
    </>
  );
}

export default ModelAndText;
