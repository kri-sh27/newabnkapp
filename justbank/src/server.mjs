import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use(express.static('public', { 
  setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
      }
  }
}));

// MongoDB Connection



mongoose.connect(process.env.mongoURI);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  accountnumber: { type: Number, required: true },
  branch: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  balance: { type: Number, default: 0 },
});

const Customer = mongoose.model("Customer", userSchema);

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, accountnumber, branch, phonenumber } = req.body;
    const newCustomer = new Customer({
      username,
      password,
      accountnumber,
      branch,
      phonenumber,
    });

    //send error if user already exists
    const userExists = await Customer
      .findOne({ username });
    if (userExists) {
      return res.status(401).json({ message: "User already exists" });
    }

    //send error if account number already exists
    const accountExists = await Customer
      .findOne({ accountnumber });
    if (accountExists) {
      return res.status(401).json({ message: "Account number already exists" });
    }

    //send error if phone number already exists
    const phoneExists = await Customer
      .findOne({ phonenumber });
    if (phoneExists) {
      return res.status(401).json({ message: "Phone number already exists" });

    }



    await newCustomer.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username });
    if (!customer) {
      return res.status(401).json({ message: "Invalid username" });
    }
    if (customer.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful",
      customer:{
        username:customer.username,
        accountnumber:customer.accountnumber,
        branch:customer.branch,
        phonenumber:customer.phonenumber,
        balance:customer.balance
      }
     });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//deposit page backend

const depositSchema = new mongoose.Schema({
  username: { type: String, required: true },
  accountnumber: { type: Number, required: true },
  date: { type: Date, required: true },
  depositamount: { type: Number, required: true },
  deposittype: { type: String, required: true },
});

const Deposit = mongoose.model("Deposit", depositSchema); 

app.post("/api/deposit", async (req, res) => {
  try {
    const { username, accountnumber, date, depositamount, deposittype } = req.body;

    

    // Find the customer by username and account number
    const customer = await Customer.findOne({ username, accountnumber });
    console.log("Customer data:", customer);

    if (!customer) {
      console.log("Customer not found");
      return res.status(404).json({ message: "Customer not found" });
    }

    

    // Update the customer's balance
    customer.balance = Number(customer.balance) + Number(depositamount);
    await customer.save();

   

    // Create a new deposit record
    const newDeposit = new Deposit({
      username,
      accountnumber,
      date,
      depositamount,
      deposittype,
    });
    await newDeposit.save();

    // Respond with success and updated balance
    res.status(201).json({
      message: "Deposit successful",
      balance: customer.balance,
    });
  } catch (error) {
    console.error("Error in deposit endpoint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//withdrawl page backend

const withdrawlSchema = new mongoose.Schema({
  username: String,
  accountnumber: Number,
  date: { type: Date, default: Date.now }, // Automatically sets the current date
  withdrawlamount: Number,
  withdrawltype: String,
});

const Withdrawl = mongoose.model("Withdrawl", withdrawlSchema);

app.post("/api/withdrawl", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Destructure fields from the request body
    const { username, accountnumber, withdrawlamount, withdrawltype } = req.body;

    const customer = await Customer.findOne({ username, accountnumber });

    customer.balance = Number(customer.balance) - Number(withdrawlamount);

    if(customer.balance<0){
      return res.status(400).json({ message: "Insufficient balance" });
    }
    else{
      await customer.save();
    

      // Create a new withdrawal record
      const newWithdrawl = new Withdrawl({
        username,
        accountnumber,
        withdrawlamount,
        withdrawltype,
      });
  
      // Save the record to the database
      await newWithdrawl.save();
  
      // Send success response
      res.status(201).json({ message: "Withdrawal record created successfully", 
        balance: customer.balance
      });
    }
    
    


  } catch (error) {
    console.error("Error saving withdrawal record:", error);

    // Send error response
    res.status(500).json({ error: "Failed to create withdrawal record" });
  }
});





// Start Server
app.listen(process.env.PORT || 4001);
