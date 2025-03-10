import React from "react";
import accdet_img from "../images/account_details.png";

const Accountdetail = ({ customer, updatedbalance }) => {
  return (
    <>
      <div className="relative min-h-screen bg-neutral-700">
        <div className="absolute inset-0 z-0">
          <img src={accdet_img} alt="kiran" className="w-full h-full object-cover"/>
        </div>
        <div className="form-section absolute top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-80 flex flex-col justify-center z-10">
          <div className="p-4 text-white shadow-lg accountdetails_div rounded-lg mx-auto w-11/12 sm:w-4/5 md:w-3/5 bg-neutral-800">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-green-500 mb-4">
              Account Details
            </h1>
            <p className="text-sm sm:text-base md:text-xl py-2 mx-2 sm:mx-4 shadow-sm sm:shadow-md bg-neutral-700 rounded-md px-2 sm:px-4 my-2 sm:my-5">
              Username: {customer.username}
            </p>
            <p className="text-sm sm:text-base md:text-xl py-2 mx-2 sm:mx-4 shadow-sm sm:shadow-md bg-neutral-700 rounded-md px-2 sm:px-4 my-2 sm:my-5">
              Account Number: {customer.accountnumber}
            </p>
            <p className="text-sm sm:text-base md:text-xl py-2 mx-2 sm:mx-4 shadow-sm sm:shadow-md bg-neutral-700 rounded-md px-2 sm:px-4 my-2 sm:my-5">
              Branch: {customer.branch}
            </p>
            <p className="text-sm sm:text-base md:text-xl py-2 mx-2 sm:mx-4 shadow-sm sm:shadow-md bg-neutral-700 rounded-md px-2 sm:px-4 my-2 sm:my-5">
              Phone Number: {customer.phonenumber}
            </p>
            <p className="text-sm sm:text-base md:text-xl py-2 mx-2 sm:mx-4 shadow-sm sm:shadow-md bg-neutral-700 rounded-md px-2 sm:px-4 my-2 sm:my-5">
              Available Balance:{" "}
              <span className="text-green-500 text-lg sm:text-2xl font-bold">
                {updatedbalance === 0 ? customer.balance : updatedbalance}
              </span>{" "}
              balance
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountdetail;