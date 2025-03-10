import React, { useState } from 'react';
import axios from 'axios';
import logimg from '../images/login_img.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


const Login = ({updatecustomer}) => {
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    username: "",
    password: "",
  });

  const handleClear = () => {
    setLogindata({
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/login", logindata);
      updatecustomer(response.data.customer)
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/Accountdetail")
      },2000)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="image-section md:w-3/5">
          <img
            className="md:h-screen w-full object-cover"
            src={logimg}
            alt="logimg"
          />
        </div>
        <div className="form-section bg-neutral-200 md:w-2/5 px-5 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                type="text"
                value={logindata.username}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='username'
                required
                onChange={(e) => setLogindata({ ...logindata, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                value={logindata.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder='password'
                onChange={(e) => setLogindata({ ...logindata, password: e.target.value })}
                maxLength={8}
              />
            </div>

            <div className="flex">
              <button
                className="border bg-green-500 hover:bg-green-600 p-3 gap mx-1 rounded my-2 w-50%"
                type="submit"
              >
                Login
              </button>
              <button
                className="border bg-neutral-400 hover:bg-red-400 p-3 my-2 mx-1 rounded w-50%"
                type="button"
                onClick={handleClear}
              >
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

export default Login;
