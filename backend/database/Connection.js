const mongoose = require('mongoose');
require('dotenv').config();

const databasekey = encodeURI(process.env.DB_Key);

const DB = `mongodb+srv://zebsoft:${databasekey}@zebsoft.iyoy4go.mongodb.net/mta`;

mongoose.connect(DB).then(() => {
    console.log('database connected');
})