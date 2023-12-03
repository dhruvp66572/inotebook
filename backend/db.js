const mongoose = require('mongoose');
const mogoURI = "mongodb://localhost:27017/"

const connectToMongo = () =>{
    mongoose.connect(mogoURI).then((success) => console.log("Connected to Mongo Successfully")).catch((err)=>
    console.log(err.message));
     
} 


module.exports = connectToMongo;