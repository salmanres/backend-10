const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4500;
const cors = require('cors')
const bodyParser = require('body-parser');
const userData = require("./schema/UserSchema");
require('./database/Connection');
const path = require('path');
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const collection = ['book1', 'book2', 'book3'];
    res.render('index', {collection});
});

app.post('/register', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const udata = new userData(data);
        await udata.save();
        res.status(200).json({ message: "saved!" });
    } catch (err) {
        res.status(280).json({ message: "internal error occured!" });
        console.log(err);
    }
});

app.get('/getdata', async (req, res) => {
    const data = await userData.find({"fullname": {"$regex": "Cha", "$options": "i"}});
    res.status(201).send(data);
})



app.post('/login', async (req, res) => {
    const data = req.body;
    try {
        const udata = await userData.findOne({ email: data.email })
        console.log(udata);
        console.log(data.password);
        if (udata.password == data.password) {
            res.status(350).json({ message: "login successful!" });
        } else {
            res.status(380).json({ message: "incorrect username/password" });
        }
    } catch (e) {
        console.log(e);
    }

})

app.put('/editdata/:id', async (req, res) => {
    const { id } = req.params;
    const udata = req.body;
    try {
        const data = await userData.findByIdAndUpdate(id, udata, { new: 'true' });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }

});


app.get('/getsingledata/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const data = await userData.findOne({ _id: id });
        res.status(220).send(data);
    } catch (err) {
        console.log(err);
    }
})


//   delete dadta api

app.delete('/deletedata/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userData.findByIdAndDelete(id);
        res.status(222).json({ message: "deleted!" });
    } catch (err) {
        console.log(err);
    }
})



app.listen(port, () => {
    console.log(`app is listening on port no: ${port}`);
});