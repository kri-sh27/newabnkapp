import React, { useState } from "react";
import wimg from "../images/withdraw_img.png";
import axios from "axios";
import swal from "sweetalert";

const WithdrawlForm = ({ customer, updatebalance }) => {
  const [withdrawl, setWithdrawl] = useState({
    username: customer.username,
    accountnumber: customer.accountnumber,
    withdrawlamount: "",
    withdrawltype: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/withdrawl",
        withdrawl
      );

      updatebalance(response.data.balance);

      swal({
        title: "Withdrawal Successful",
        text: `Amount Withdrawn: ${withdrawl.withdrawlamount}`,
        icon: "success",
        button: "Ok",
      });
    } catch (error) {
      console.log("Withdrawal failed", error);
      swal({
        title: "Withdrawal Failed",
        text: `Amount Withdrawal failed due to ${error.response.data.message}`,
        icon: "error",
        button: "Ok",
      });
    }

    setWithdrawl({
      username: customer.username,
      accountnumber: customer.accountnumber,
      withdrawlamount: "",
      withdrawltype: "",
    });
  };

  const handleClear = () => {
    setWithdrawl({
      username: customer.username,
      accountnumber: customer.accountnumber,
      withdrawlamount: "",
      withdrawltype: "",
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-200">
        {/* Image Section */}
        <div className="image-section mt-16 md:mt-0 w-full md:w-3/5">
          <img
            className="h-48 md:h-screen w-full object-cover"
            src={wimg}
            alt="Withdraw"
          />
        </div>

        {/* Form Section */}
        <div className="form-section bg-neutral-200 w-full md:w-2/5 p-5 flex flex-col justify-center">
          <h1 className="text-green-400 font-semibold text-2xl md:text-3xl text-center mb-4">
            Withdraw Form
          </h1>
          <form className="space-y-4" onSubmit={handlesubmit}>
            <p className="text-base md:text-xl py-2 w-full md:w-3/4 my-3">
              Username: {customer.username}
            </p>
            <p className="text-base md:text-xl py-2 w-full md:w-3/4 my-3">
              Account Number: {customer.accountnumber}
            </p>
            <label className="block text-sm md:text-base">Withdrawal Amount</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter amount"
              value={withdrawl.withdrawlamount}
              onChange={(e) =>
                setWithdrawl({ ...withdrawl, withdrawlamount: e.target.value })
              }
              required
            />
            <label className="block text-sm md:text-base">Withdrawal Type</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Type of withdrawal (e.g., ATM, Online)"
              value={withdrawl.withdrawltype}
              onChange={(e) =>
                setWithdrawl({ ...withdrawl, withdrawltype: e.target.value })
              }
              required
            />
            <div className="flex flex-col md:flex-row gap-2">
              <button className="border bg-green-500 hover:bg-green-600 p-3 rounded my-2 w-full md:w-1/4">
                Withdraw
              </button>
              <button
                className="border bg-neutral-400 hover:bg-red-400 p-3 rounded my-2 w-full md:w-1/4"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WithdrawlForm;
