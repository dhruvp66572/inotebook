const mongoose = require('mongoose');
const mogoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
    mongoose.connect(mogoURI).then(success => console.log("Connected to Mongo Successfully")).catch((err)=>
    console.log(err));
} ;

module.exports = connectToMongo;