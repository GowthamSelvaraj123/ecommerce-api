const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://gowthamdeveloper94:j4MrbOibMJIwFzsQ@cluster0.beikt.mongodb.net/ecommerce");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err)
    {
         console.error(`Error connecting to MongoDB: ${err.message}`);
    }   
}

module.exports = connectDB;