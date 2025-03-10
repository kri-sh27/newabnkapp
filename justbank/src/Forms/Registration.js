import React, { useState } from "react";
import regimg from "../images/registrationimg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    accountnumber: "",
    branch: "",
    phonenumber: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Sending signup data:", signupData);
    try {
      const response = await axios.post(
        "http://localhost:4001/api/signup",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);
      toast.success(response.data.message, { position: "top-right", autoClose: 2000 });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (error.response.status === 401) {
          toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
        } else {
          toast.error("Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Server is unreachable. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleclear = () => {
    setSignupData({
      username: "",
      password: "",
      accountnumber: "",
      branch: "",
      phonenumber: "",
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="image-section md:w-3/5">
          <img className="md:h-screen w-full object-cover" src={regimg} alt="bankimg" />
        </div>
        <div className="form-section bg-neutral-200 md:w-2/5 px-5 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                required
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                maxLength={8}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Account Number:</label>
              <input
                type="number"
                required
                placeholder="Account Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                value={signupData.accountnumber}
                onChange={(e) => {
                  if (e.target.value.length <= 14) {
                    setSignupData({ ...signupData, accountnumber: e.target.value });
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Branch:</label>
              <input
                type="text"
                required
                placeholder="Branch"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                value={signupData.branch}
                onChange={(e) => setSignupData({ ...signupData, branch: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Registered phone number:</label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone Number"
                value={signupData.phonenumber}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setSignupData({ ...signupData, phonenumber: e.target.value });
                  }
                }}
                required
              />
            </div>

            <div className="flex">
              <button className="border bg-green-500 hover:bg-green-600 p-3 gap mx-1 rounded my-2 w-50%" type="submit">
                Sign up
              </button>
              <button onClick={handleclear} className="border bg-neutral-400 hover:bg-red-400 p-3 my-2 mx-1 rounded w-50%" type="button">
                Clear
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Registration;
