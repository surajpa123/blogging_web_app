const express = require("express");

const router  = express.Router();

const CreateUser = require("../models/UserModel");

const User = require("../models/UserModel")

const postSchema  = require("../models/PostModel")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const Post = require("../models/PostModel");


// db
const users = []

router.get("/", (req,res)=>{
    console.log("hello this is homepage");
    res.json({"result":"this is homepage"})
})

router.post("/post",authenticate, async (req,res)=>{

    try {

        const {title,content} = req.body;

        const author  = req.author;

        let post = new postSchema({title,content,author});

       const savedPost  = await post.save();

       // saving post id in user schema posts

       const getUser = await User.findById(author);


       getUser.posts = getUser.posts.concat(savedPost._id)
    //    getUser.posts.push(savedPost._id);

       await getUser.save()

       console.log(getUser)


      res.status(200).json({message:"Post created sucessfully",savedPost})

        
    } catch (error) {
        res.json({error})
    }

})


router.get("/allposts", authenticate, isAdmin, async (req,res)=>{

    try {

        const allposts = await postSchema.find().populate('author');

        res.status(200).json(allposts);
        

        
    } catch (error) {
        res.json(error)
    }



})



router.get("/allusers", authenticate, isAdmin, async (req,res)=>{

    try {

        const allusers = await User.find().populate({path:"posts"})


        console.log(allusers,'alluser')

        res.status(200).json(allusers)
        
    } catch (error) {

        res.json({error})
        
    }


})


router.post("/login",async (req,res)=>{

    try {

    const {email,password} = req.body;

    let user = await  User.findOne({email})

    if(user){
     let result = await bcrypt.compare(password,user.password);
     console.log(result);
     if(result){
        const payload = {
            "userId" :user._id,
            "userName": user.email,
            'role':user.role
        }

     let token = await jwt.sign(payload, process.env.SecretKey, {expiresIn:"6d"});

     res.status(201).json({token,email})
        console.log(payload)
     }else{
        res.json({message:"Incorrect password"})
     }
    }
        
    } catch (error) {
        console.log(error)
        res.json(error)
    }

})

router.post("/signup", async (req,res)=>{

    try {

    const {firstName,lastName, email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log(req.body);

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({ message: 'Email already exists.' });
    }

    // hash the password;

    let hashedPass = await bcrypt.hash(password,10)

    const newUser = new User({firstName,lastName, email,password: hashedPass});

    newUser.save();

    res.status(200).json({ message: 'User created successfully', user: newUser });
    users.push(newUser)

        
    } catch (error) {
        console.log(error)
        res.json(error)
    }

})

router.get("/blog", (req,res)=>{
    console.log("hello this is blog page");
    res.json({"result":"this is blog page"})
})


module.exports = router