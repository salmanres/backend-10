const mongoose = require('mongoose');
require('dotenv').config();

const databasekey = encodeURI(process.env.DB_Key);

const DB = `mongodb+srv://zebsoft:${databasekey}@zebsoft.iyoy4go.mongodb.net/mta`;

const message = () => {
    console.log('database connected');
}

mongoose.connect(DB).then(() => {
    message();
})