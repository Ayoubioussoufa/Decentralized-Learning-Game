import React, { Suspense } from "react";

function Interactive() {
  return (
    <>
      <div className="mt-20 max-w-7xl text-white mx-auto grid md:grid-cols-2 justify-items-center items-center">
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-2xl sm:text-5xl">Interactive Coding Lessons </h1>
            <p className="mt-10 text-lg font-medium text-gray2">In-browser step-by-step lessons take you from the very basics of Solidity to creating your own fully-functional blockchain-based game. Even by the end of Lesson 1 (which can be completed in one sitting), you'll know enough to officially call yourself a blockchain developer!</p>
          </div>
          <div className="h-full p-5 mt-10">
            <img src="assets/testing.png" alt="solidity code" />
          </div>
      </div>
    </>
  );
}

export default Interactive;
