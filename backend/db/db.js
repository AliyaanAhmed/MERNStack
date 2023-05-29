const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = () => {
    
    mongoose.connect("mongodb+srv://aliyaanahmed463:E*ARqHx7zqiX8ek@cluster0.n2yuxeo.mongodb.net/karoobar",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(data => {
            console.log(`Database connected`)
        }).catch(err => {
            console.log(`${err.message}`);
        })
}

module.exports = connectToDb;