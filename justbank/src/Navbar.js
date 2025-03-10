import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ customer, setCustomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCustomer(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl md:text-4xl font-bold">JUST Bank</div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/">
            <h2 className="text-white text-xl hover:text-gray-300 bg-yellow-400 px-2 py-1 rounded">
              Home
            </h2>
          </Link>
          {!customer ? (
            <>
              <Link to="/login">
                <button className="bg-white text-blue-800 px-2 py-1 rounded">
                  Login
                </button>
              </Link>
              <Link to="/registration">
                <button className="bg-yellow-400 text-blue-800 px-2 py-1 rounded">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Accountdetail">
                <h2 className="text-white text-xl hover:text-gray-300 bg-yellow-400 px-2 py-1 rounded">
                  Account Details
                </h2>
              </Link>
              <Link to="/DepositForm">
                <h2 className="text-white text-xl hover:text-gray-300 bg-yellow-400 px-2 py-1 rounded">
                  Deposit
                </h2>
              </Link>
              <Link to="/WithdrawlForm">
                <h2 className="text-white text-xl hover:text-gray-300 bg-yellow-400 px-2 py-1 rounded">
                  Withdrawal
                </h2>
              </Link>
              <button
                className="text-white text-xl hover:text-gray-300 bg-red-600 px-2 py-1 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <h2 className="text-white text-center m-2 text-lg hover:text-gray-300 bg-yellow-400 px-2 py-1 rounded w-full">
              Home
            </h2>
          </Link>
          {!customer ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-white m-2 text-blue-800 px-2 py-1 rounded w-full">
                  Login
                </button>
              </Link>
              <Link to="/registration" onClick={() => setIsOpen(false)}>
                <button className="bg-yellow-400 m-2 text-blue-800 px-2 py-1 rounded w-full">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Accountdetail" onClick={() => setIsOpen(false)}>
                <h2 className="text-white text-lg hover:text-gray-300 bg-yellow-400 px-2 py-1 m-2 rounded w-full text-center">
                  Account Details
                </h2>
              </Link>
              <Link to="/DepositForm" onClick={() => setIsOpen(false)}>
                <h2 className="text-white text-lg hover:text-gray-300 bg-yellow-400 px-2 py-1 m-2 rounded w-full text-center">
                  Deposit
                </h2>
              </Link>
              <Link to="/WithdrawlForm" onClick={() => setIsOpen(false)}>
                <h2 className="text-white text-lg hover:text-gray-300 bg-yellow-400 px-2 py-1 m-2 rounded w-full text-center">
                  Withdrawal
                </h2>
              </Link>
              <button
                className="text-white text-lg hover:text-gray-300 bg-red-600 px-2 py-1 m-2 rounded w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
