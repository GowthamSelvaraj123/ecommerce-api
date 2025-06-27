const mongoose = require('mongoose');
require('dotenv').config(); 
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MongoDB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err)
    {
         console.error(`Error connecting to MongoDB: ${err.message}`);
    }   
}

module.exports = connectDB;