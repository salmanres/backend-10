const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4500;
const cors = require('cors')
const userData = require("./schema/UserSchema");
require('./database/Connection');
const path = require('path');
const eventEmitter = require('events');
const emitter = new eventEmitter();
const fs = require('fs');
const multer = require('multer');
const filedata = require('./schema/FileSchema');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const secKey = crypto.randomBytes(64).toString('hex');
// console.log(secKey);
const secKey = process.env.SEC_KEY;
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const verifyToken = require('./auth/Jwt');
const nodemailer = require('nodemailer');



app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Date.now()
    }
});

const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salmanmtaindia@gmail.com',
        pass: 'Mta@india'
    }
});






app.post('/upload', upload.array('files', 10), async (req, res) => {
    // console.log(req.files);
    if (req.files) {
        try {
            const fileDocs = req.files.map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                path: `/uploads/${file.filename}`,
                size: file.size
            }))
            await filedata.insertMany(fileDocs);
            res.send('files uploaded');
        } catch (err) {
            console.log(err);
            res.send('internal server errror!');
        }
    } else {
        res.send('files not uploaded');
    }
})

app.get('/getfiles', async (req, res) => {
    try {
        const data = await filedata.find();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
})



const t1 = () => {
    console.log('task1');
}
const t2 = () => {
    console.log('task2');
}
const t3 = () => {
    console.log('task3');
}

emitter.on('event1', t1);
emitter.on('event2', t2);
emitter.on('event3', t3);


app.get('/emitter', (req, res) => {
    emitter.emit('event3');
    emitter.emit('event2')
    res.send('executed');
});

app.get('/createfile', (req, res) => {
    const students = ['student1', 'student2', 'student3'];
    fs.writeFile('file2.json', JSON.stringify(students), (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('file generated');
        }
    })
})

app.get('/readfile', (req, res) => {
    fs.readFile('file1.txt', 'utf-8', (err, x) => {
        if (err) {
            console.log(err);
        } else {
            res.send(x);
        }
    })
})


app.get('/', (req, res) => {
    const collection = ['book1', 'book2', 'book3'];
    res.render('index', { collection });
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

app.get('/getdata', verifyToken, async (req, res) => {
    const data = await userData.find({ "fullname": { "$regex": "", "$options": "i" } });
    res.status(201).send(data);
})

app.post('/sendemail', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const mailOptions = {
            from: 'salmanmtaindia@gmail.com',
            to: 'salmanmtaindia@gmail.com',
            subject: data.subject,
            text: data.message,
            html: `<p>${data.message}</p>`
        };
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
                res.status(200).send('email sent');
            }
        })
    } catch (err) {
        console.log(err);
    }
})



// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {

//         const udata = await userData.findOne({ email: 'aditya@test.com' })
//         console.log(udata);
//         const pwd = await bcrypt.compare(password, udata.password);
//         console.log(pwd);
//         if (!pwd) {
//             res.status(350).json({ message: "incorrect username/password" });
//         } else {
//             const payload = { id: udata._id, email: udata.email };
//             const token = jwt.sign(payload, secKey, { expiresIn: '1d' });
//             res.status(200).json({ message: "login successful!", token });
//         }
//     } catch (e) {
//         console.log(e);
//     }

// })

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        const udata = await userData.findOne({ email: 'email' })
        console.log(udata);
        if (udata) {
            if (udata.password == password) {
                const payload = { id: udata._id, email: udata.email };
                const token = jwt.sign(payload, secKey, { expiresIn: "1d" });
                res.status(200).json({ message: 'login successful', token });
            } else {
                res.status(244).json({ message: 'invalid username/pass' });
            }
        } else {
            res.status(344).json({ message: 'user not found' });
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