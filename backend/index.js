const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello DP ...')
})

app.listen(port,()=>{
    console.log(`Example app Listening at http://localhost:${port}`)
})