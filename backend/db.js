const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Mongourl = process.env.MONGO_CONNECTION;

const connectToMongo = async () => {
    mongoose.connect(Mongourl).then(success => console.log("Connected to Mongo Successfully")).catch((err)=>
    console.log(err));
};

module.exports = connectToMongo;