const express = require("express");
const app = express();
const port = 3500;
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.send("my app");
});

app.get('/userdata', (req, res) => {
    res.json({ "name": "rakesh", "mobile": "456789", "password": "1234" });
});

// app.get('/login', (req, res)=>{
//     res.status(355).send("login page");
// });

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        if (username === "ravi" && password === "12345") {
            res.status(280).json({ message: "login successful" });
        } else {
            res.status(230).json({ message: "incorrect username/password!" });
        }
    }catch(err){
        console.log(err);
    }
    
});

// app.post('/login', (req, res) => {
//     const {id} = req.params;
//     console.log (id);
//     res.send('hello');
// });




app.listen(port, () => {
    console.log(`app is listening on port no: ${port}`);
});