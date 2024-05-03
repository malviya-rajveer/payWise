const express = require("express")
const { User , Account } = require("../db")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { authMiddleware } = require("../middleware")
const { JWT_SECRET } = require("../config")

const router = express.Router()

const signupSchema = zod.object({
    username :zod.string(),
    firstname :zod.string(),
    lastname :zod.string(),
    password :zod.string(),
})

router.post("/signup", async function(req, res){
    
    const { success } = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username : req.body.username,
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbuser = await User.create(req.body)

    const userId = dbuser._id;

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000

    })

    const token = jwt.sign({
        userId,
    },JWT_SECRET)
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

//////////////////////////////////////////
const signinSchema = zod.object({
    username : zod.string(),
    password : zod.string()

})

router.post("/signin", async (req,res)=>{
    const body = req.body
    const { success } = signinSchema.safeParse(req.body)
    if(!success){
    return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const dbuser = await User.findOne({
        username : body.username
    })

    if(!dbuser._id){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const token = jwt.sign({
        userId : dbuser._id
    }, JWT_SECRET)

    res.json({
        token: token
    })
})
/////////////////////////////////////////////
const updateSchema = zod.object({
    password : zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()
})
router.put("/",authMiddleware,async (req,res)=>{    
    const { success } = updateSchema.safeParse(req.body)
    if(!success){
     return res.status(411).json({
        message: "Error while updating information"
     })       
    }

    await User.updateOne({
        _id : req.userId,
    }, req.body)

    res.json({
        message: "Updated successfully"
    })
})
////////////////////////////////////////////////

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router; 
    