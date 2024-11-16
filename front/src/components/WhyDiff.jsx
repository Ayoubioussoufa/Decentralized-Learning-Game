import React, { Suspense } from "react";

function WhyDiff() {
    return (
        <>
            <div className="mt-10 max-w-7xl text-white mx-auto grid md:grid-cols-2 justify-content-center items-center">
                <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <h1 className="font-bold text-2xl sm:text-5xl">Why AyBiouss is Different</h1>
                    <div className="flex items-center gap-10">
                        <span className="mt-6 grid">
                            <img src="assets/group.png" alt="" />
                            <small className="text-gray2 text-lg">Students</small>
                        </span>
                        <span className="mt-6 grid">
                            <strong className="font-bold text-4xl">1M+</strong>
                            <small className="text-gray2 text-lg">Classes Completed</small>
                        </span>
                    </div>
                </div>
                <div className="">
                    <p className="p-6 text-gray2">
                        AyBiouss is the largest education platform for blockchain development, it’s been around for 2+ years, with over 400k registered users that have finished multiple courses.
                    </p>
                    <p className="p-6 text-gray2">AyBiouss was the first tutorial on the internet for NFTs, and is still very relevant to the new crop of web3 developers looking to enter the industry today. Currently the AyBiouss curriculum is mostly focused on Ethereum and Solidity development, but is a lot of demand for content targeting other chains such as Binance, TRON, and even projects like Chainlink.</p>
                </div>
            </div>
        </>
    );
}

export default WhyDiff;
