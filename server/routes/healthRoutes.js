const express = require("express");

const router = express.Router();

router.get('/',(req,resp)=>{
    resp.json({status:"okayyyyy"})
})

module.exports =router; // ye ek single file ko export kr rha hai isliye its behave like Default