import './App.css';
import Accountdetail from './Forms/Accountdetail';
import Login from './Forms/Login';
import Registration from './Forms/Registration';
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import DepositForm from './Forms/DepositForm';
import WithdrawlForm from './Forms/WithdrawlForm';

function App() {
  const [customer, setCustomer] = useState();
  const updatecustomer=(userdata)=>{
    setCustomer(userdata)
    console.log(userdata);

  }

  const [updatedbalance, setUpdatedbalance] = useState(0);
  
  

  const updatebalance = (newbalance)=>{
    setUpdatedbalance(newbalance)
  }


   

  
  return (
    <>
      <Router>
        <Navbar customer={customer} setCustomer={setCustomer}/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login updatecustomer={updatecustomer}/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/Accountdetail" element={<Accountdetail customer={customer} updatedbalance={updatedbalance} />} />
          <Route path="/DepositForm" element={<DepositForm customer={customer} updatebalance={updatebalance} />} />
          <Route path="/WithdrawlForm" element={<WithdrawlForm customer={customer} updatebalance={updatebalance}/>} />
        </Routes>
      </Router>
    </>
  );
}


export default App;