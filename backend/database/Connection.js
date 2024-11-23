const mongoose = require('mongoose');

const DB = "mongodb+srv://zebsoft:KO1yATRwKBt4sJ1y@zebsoft.iyoy4go.mongodb.net/mta";

mongoose.connect(DB).then(() => {
    console.log('database connected');
})