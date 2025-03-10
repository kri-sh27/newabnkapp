import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const DepositForm = ({ customer, updatebalance }) => {
    const [depositData, setDeposit] = useState({
        username: customer.username,
        accountnumber: customer.accountnumber,
        date: "",
        depositamount: "",
        deposittype: "",
    });

    const handleDeposit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await axios.post("http://localhost:4001/api/deposit", depositData);
            console.log(response.data.balance);
            updatebalance(response.data.balance);

            swal({
                title: "Deposit Successful",
                text: `Amount Deposited: ${depositData.depositamount}`,
                icon: "success",
                button: "Ok",
            });
        } catch (err) {
            console.log(err);
        }

        setDeposit({
            date: "",
            depositamount: "",
            deposittype: "",
        });
    };

    const handleClear = (e) => {
        e.preventDefault();
        setDeposit({
            date: "",
            depositamount: "",
            deposittype: "",
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-blue-200 shadow-lg rounded-lg ">
            <form onSubmit={handleDeposit} className="space-y-4">
                <h1 className="text-2xl font-bold text-center mb-4">Deposit Form</h1>

                <p className="text-sm">
                    <span className="font-semibold text-xl">Username:</span> <span className='text-red-500 font-bold text-lg'>{customer.username}</span>
                </p>
                <p className="text-sm">
                    <span className="font-semibold text-xl">Account Number:</span> <span className='text-red-500 font-bold text-lg
                    '>{customer.accountnumber}</span>
                </p>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Date:</label>
                    <input
                        type="date"
                        onChange={(e) => setDeposit({ ...depositData, date: e.target.value })}
                        name="date"
                        required
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Deposit Amount:</label>
                    <input
                        type="number"
                        value={depositData.depositamount}
                        onChange={(e) => setDeposit({ ...depositData, depositamount: e.target.value })}
                        placeholder='deposit amount'
                        required
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Deposit Type:</label>
                    <input
                        type="text"
                        name="deposittype"
                        value={depositData.deposittype}
                        onChange={(e) => setDeposit({ ...depositData, deposittype: e.target.value })}
                        placeholder='deposit type'
                        required
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Deposit
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DepositForm;
