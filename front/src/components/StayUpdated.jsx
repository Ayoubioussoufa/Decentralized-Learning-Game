import React, { Suspense } from "react";

function StayUpdated() {
  return (
    <>
      <div className="p-6 mt-10 max-w-7xl text-white mx-auto justify-items-center items-center text-center">
        <h1 className="font-bold text-2xl sm:text-4xl">Stay updated</h1>
        <p className="mt-6 text-lg font-medium text-gray2">Join our mailing list to stay in the loop with our newest feature releases</p>
        <div className="mt-10">
          <form action="">
            <div>
              <input className="p-3 bg-black border rounded border-gray2 w-64" type="email" name="email" id="" placeholder="Enter Your Email Address"/>
              <button type="submit" className="px-6 py-3 bg-gold border-solid rounded hover:text-black my-5 xs:my-0">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default StayUpdated;
