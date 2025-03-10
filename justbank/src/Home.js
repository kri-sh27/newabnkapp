import React from "react";
import bankimg from "./images/homepageimg.png";
import banklogo from "./images/homepagrightlogo.png";
function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="image-section md:w-3/5">
          <img className="md:h-screen" src={bankimg} alt="bankimg" />
        </div>
        <div className="text-section bg-neutral-200 md:w-2/5 px-5">
          <div className=" border-x border-gray-400 p-5 min-h-screen">
            <img
              className="rounded h-[200px] w-[100%]"
              src={banklogo}
              alt="banklogo"
            />
            <h1 className="text-3xl text-center font-medium py-4">
              Welcome to Just Bank
            </h1>
            <h2 className="text-xl font-semibold py-2">
              Your Trusted Financial Partner
            </h2>
            <p className="text-lg my-2">
              JUST Bank is committed to providing you with the highest level of
              service, security, and convenience. Whether you're looking to
              manage your daily finances, invest in your future, or need a loan
              for a major purchase, we're here to help you every step of the
              way. It will provide a best service to the customers.
            </p>
            <p className="text-lg my-2">
              JUST Bank is committed to providing you with the highest level of
              service, security, and convenience. Whether you're looking to
              manage your daily finances, invest in your future, or need a loan
              for a major purchase, we're here to help you every step of the
              way.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
