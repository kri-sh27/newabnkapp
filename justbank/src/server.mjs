
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import AWS from 'aws-sdk';
import dotenv from "dotenv";
import pkg from 'aws-sdk';
const { DynamoDB } = pkg;
dotenv.config();
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_REGION);

const PORT = 4001;

// Setup DynamoDB
const dynamoDb = new DynamoDB.DocumentClient();
const USERS_TABLE = 'Customers';  // DynamoDB table for customers
const DEPOSITS_TABLE = 'Deposits'; // DynamoDB table for deposits
const WITHDRAWALS_TABLE = 'Withdrawals'; // DynamoDB table for withdrawals
const app = express();

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



// mongoose.connect(process.env.mongoURI);

// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// Mongoose Schema and Model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   accountnumber: { type: Number, required: true },
//   branch: { type: String, required: true },
//   phonenumber: { type: Number, required: true },
//   balance: { type: Number, default: 0 },
// });

// const Customer = mongoose.model("Customer", userSchema);

// app.post("/api/signup", async (req, res) => {
//   try {
//     const { username, password, accountnumber, branch, phonenumber } = req.body;
//     const newCustomer = new Customer({
//       username,
//       password,
//       accountnumber,
//       branch,
//       phonenumber,
//     });

//     //send error if user already exists
//     const userExists = await Customer
//       .findOne({ username });
//     if (userExists) {
//       return res.status(401).json({ message: "User already exists" });
//     }

//     //send error if account number already exists
//     const accountExists = await Customer
//       .findOne({ accountnumber });
//     if (accountExists) {
//       return res.status(401).json({ message: "Account number already exists" });
//     }

//     //send error if phone number already exists
//     const phoneExists = await Customer
//       .findOne({ phonenumber });
//     if (phoneExists) {
//       return res.status(401).json({ message: "Phone number already exists" });

//     }



//     await newCustomer.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error(error);
    
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, accountnumber, branch, phonenumber } = req.body;
     // Check if all required fields are provided
     if (!username || !password || !accountnumber || !branch || !phonenumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if user exists
    const params = {
      TableName: USERS_TABLE,
      Key: {
        username: username
      },
    };
    console.log("Checking if user exists in DynamoDB:", params);

    const userExists = await dynamoDb.get(params).promise();
    console.log("User exists response:", userExists);

    if (userExists.Item) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Create new user
    const newCustomer = {
      accountnumber: Number(accountnumber),  // Correctly assign the actual value
      username: String(username),            // Correctly assign the actual value
      password: String(password),            // Correctly assign the actual value
      branch: String(branch),                // Correctly assign the actual value
      phonenumber: Number(phonenumber),
      balance:0
    };

    const putParams = {
      TableName: USERS_TABLE,
      Item: newCustomer
    };
    console.log("Inserting new customer:", putParams);

    // await dynamoDb.put(putParams).promise();

    // res.status(201).json({ message: "User created successfully" });
    try {
      await dynamoDb.put(putParams).promise();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error saving to DynamoDB:', error);
      res.status(400).json({ message: 'Error registering user', error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// 

// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const customer = await Customer.findOne({ username });
//     if (!customer) {
//       return res.status(401).json({ message: "Invalid username" });
//     }
//     if (customer.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }
//     res.status(200).json({ message: "Login successful",
//       customer:{
//         username:customer.username,
//         accountnumber:customer.accountnumber,
//         branch:customer.branch,
//         phonenumber:customer.phonenumber,
//         balance:customer.balance
      // }
//      });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


app.post("/api/login", async (req, res) => {
  console.log("inside login")  
  try {
    const { username, password } = req.body;
 
    const params = {
      TableName: USERS_TABLE,
      Key: {
        username: username
      }
    };
 console.log("printing login param",params)
    const result = await dynamoDb.get(params).promise();
    const customer = result.Item;
    if (!customer) {
      return res.status(401).json({ message: "Invalid username" });
    }
 
    if (customer.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
 
    res.status(200).json({
      message: "Login successful",
      customer: {
        username: customer.username,
        accountnumber: customer.accountnumber,
        branch: customer.branch,
        phonenumber: customer.phonenumber,
        balance: customer.balance
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// //deposit page backend

// const depositSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   accountnumber: { type: Number, required: true },
//   date: { type: Date, required: true },
//   depositamount: { type: Number, required: true },
//   deposittype: { type: String, required: true },
// });

// const Deposit = mongoose.model("Deposit", depositSchema); 

// app.post("/api/deposit", async (req, res) => {
//   try {
//     const { username, accountnumber, date, depositamount, deposittype } = req.body;

    

//     // Find the customer by username and account number
//     const customer = await Customer.findOne({ username, accountnumber });
//     console.log("Customer data:", customer);

//     if (!customer) {
//       console.log("Customer not found");
//       return res.status(404).json({ message: "Customer not found" });
//     }

    

//     // Update the customer's balance
//     customer.balance = Number(customer.balance) + Number(depositamount);
//     await customer.save();

   

//     // Create a new deposit record
//     const newDeposit = new Deposit({
//       username,
//       accountnumber,
//       date,
//       depositamount,
//       deposittype,
//     });
//     await newDeposit.save();

//     // Respond with success and updated balance
//     res.status(201).json({
//       message: "Deposit successful",
//       balance: customer.balance,
//     });
//   } catch (error) {
//     console.error("Error in deposit endpoint:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


app.post("/api/deposit", async (req, res) => {
  console.log("backed inside deposit");
  try {
    const { username, accountnumber, date, depositamount, deposittype } = req.body;
    const depositAmountNum = Number(depositamount); // Convert depositamount to a number

    // Fetch the user
    const params = {
      TableName: USERS_TABLE,
      Key: {
        username: username
      }
    };
 
    console.log(params)
    const userResult = await dynamoDb.get(params).promise();
    const customer = userResult.Item;
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log("Customerdata",customer)
    // Update balance
    const updatedBalance = Number(customer.balance) + depositAmountNum; // Ensure balance is treated as a number
    customer.balance = updatedBalance; // Assign updated balance to the customer object

    // customer.balance += depositamount;
 
    const putParams = {
      TableName: USERS_TABLE,
      Item: customer
    };
 
    await dynamoDb.put(putParams).promise();
 
    // Record the deposit
    const depositItem = {
      // accountnumber:Number,
      // username:String,
      // date:String,
      // depositamount:Number,
      // deposittype:String
      accountnumber: customer.accountnumber,
      username: customer.username,
      date: date,
      depositamount: depositAmountNum,
      deposittype: deposittype,
    };
 
    const depositParams = {
      TableName: DEPOSITS_TABLE,
      Item: depositItem
    };
 
    await dynamoDb.put(depositParams).promise();
 
    res.status(201).json({
      message: "Deposit successful",
      balance: customer.balance
      // balance: updatedBalance, // Send the updated balance

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// //withdrawl page backend

// const withdrawlSchema = new mongoose.Schema({
//   username: String,
//   accountnumber: Number,
//   date: { type: Date, default: Date.now }, // Automatically sets the current date
//   withdrawlamount: Number,
//   withdrawltype: String,
// });

// const Withdrawl = mongoose.model("Withdrawl", withdrawlSchema);

// app.post("/api/withdrawl", async (req, res) => {
//   try {
//     console.log("Request body:", req.body);

//     // Destructure fields from the request body
//     const { username, accountnumber, withdrawlamount, withdrawltype } = req.body;

//     const customer = await Customer.findOne({ username, accountnumber });

//     customer.balance = Number(customer.balance) - Number(withdrawlamount);

//     if(customer.balance<0){
//       return res.status(400).json({ message: "Insufficient balance" });
//     }
//     else{
//       await customer.save();
    

//       // Create a new withdrawal record
//       const newWithdrawl = new Withdrawl({
//         username,
//         accountnumber,
//         withdrawlamount,
//         withdrawltype,
//       });
  
//       // Save the record to the database
//       await newWithdrawl.save();
  
//       // Send success response
//       res.status(201).json({ message: "Withdrawal record created successfully", 
//         balance: customer.balance
//       });
//     }
    
    


//   } catch (error) {
//     console.error("Error saving withdrawal record:", error);

//     // Send error response
//     res.status(500).json({ error: "Failed to create withdrawal record" });
//   }
// });


app.post("/api/withdrawl", async (req, res) => {
  try {
    const { username, accountnumber, withdrawlamount, withdrawltype } = req.body;
    const withdrawAmountNum = Number(withdrawlamount);
 // Check if the withdrawal amount is a valid number and greater than zero
 if (isNaN(withdrawAmountNum) || withdrawAmountNum <= 0) {
  return res.status(400).json({ message: "Invalid withdrawal amount" });
}
    const params = {
      TableName: USERS_TABLE,
      Key: {
        // accountnumber: accountnumber,
        username: username
      }
    };
 
    const userResult = await dynamoDb.get(params).promise();
    const customer = userResult.Item;
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
 
    if (customer.balance < withdrawlamount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    // customer.balance -= withdrawlamount;
    customer.balance -= withdrawAmountNum;

 
    const putParams = {
      TableName: USERS_TABLE,
      Item: customer
    };
 
    await dynamoDb.put(putParams).promise();
 
    // Record the withdrawal
    const withdrawItem = {
      accountnumber: customer.accountnumber,
      username: customer.username,
      withdrawlamount: withdrawAmountNum, // Store the number as a number
      withdrawltype: withdrawltype,
      date: new Date().toISOString() 
    };
 
    const withdrawParams = {
      TableName: WITHDRAWALS_TABLE,
      Item: withdrawItem
    };
 
    await dynamoDb.put(withdrawParams).promise();
 
    res.status(201).json({
      message: "Withdrawal successful",
      balance: customer.balance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Start Server
app.listen(process.env.PORT || 4001);