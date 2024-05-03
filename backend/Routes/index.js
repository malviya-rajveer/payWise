const express = require("express")
const userRout = require("./userRouter")
const accooountRout = require("./account")

const router = express.Router()

router.use("/user" , userRout)
router.use("/account" , accooountRout)
module.exports = router;