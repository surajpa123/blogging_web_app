const express = require('express');

const routes  = require("./routes/router");

const mongoose = require('mongoose');

const env = require('dotenv')


const app = express();

env.config()

const port = 8080

const db = process.env.DB_URL

app.use(express.json());


app.use(routes)


app.use("/signup", routes)

app.listen(port, ()=>{
    console.log("listening to this", port)
})


// console.log(db)

// async function  dbConnection(){

//  let  res = await mongoose.connect(db);

//  console.log(res)


// }

// dbConnection()

mongoose.connect(db)
.then((res)=>{
    console.log('connected to the database')
}).catch((err)=> console.log('error connecting', err))


