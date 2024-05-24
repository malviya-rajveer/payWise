const express = require("express");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require('mongoose');
const router = express.Router()


router.get("/balance" , authMiddleware , async (req,res)=>{

    const UserName = await User.findOne({
        _id : req.userId
    })
    const account = await Account.findOne({
        userId : req.userId
    })

    res.json({
        balance : account.balance,
        name : UserName.firstname
    })
}) 

router.post("/transfer" , authMiddleware , async (req,res)=>{
    
  try{
    const session = await mongoose.startSession();


    session.startTransaction();
    const { amount , to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    };

    const toAccount = await Account.findOne({ userId : to }).session(session)


    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        });
    }
 
    await Account.updateOne({ userId : req.userId}, {$inc : {balance : -amount} }).session(session);
    await Account.updateOne({ userId : to}, {$inc : {balance : amount} }).session(session)

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });     
  } catch(err){
        res.json({
            message: "Insufficient balance"
  })
  }

}) 

module.exports = router;