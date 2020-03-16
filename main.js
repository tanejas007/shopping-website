const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const websModel = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require(passport);
// const cart = require('./router/cart');
// const expressValidator = require('expressValidator');
// connect to db
const router = express.Router();
// const website = websModel.find({});
const initializePassport = require('.//passport-config');
initializePassport(passport);
const app = express();
app.use("/public",express.static('./public'));
app.use(express.urlencoded({extended: false}));
const users = []
// body parser middleware
app.use(bodyParser.urlencoded({extended : false }));

//  parser application json
app.use(bodyParser.json());

// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

//  express validator
// app.use(expressValidator({
//     errorFormatter: function(param, msg, value){
//         var namespace = param.split('.'),
//         root = namespace.shift(),
//         formParam = root;

//         while(namespace.length){
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param : formParam,
//             msg : msg,
//             value : value
//         };
//     }
// }));

//  express messages middleware
app.use(require('connect-flash')());
app.use(function(req,res,next){
    res.locals.messages = require('express-messages')(req,res);
    next();
});


app.get('*' , function(req,res,next){
    res.locals.cart = req.session.cart;
    next();
});

app.use("/index",express.static('./index'));
app.get("/" , (req,res)=> {
    res.sendFile(__dirname + '/homepage.html');
});
app.get("/index/about" , (req,res)=> {
    res.sendFile(__dirname + '/index/about.html');
});
app.get("/index/cart" , (req,res,next)=> {
    website.exec(function(err,data){
        if (err)  throwerr;
        console.log(data);
        res.sendFile(__dirname + '/index/cart.html',{data});
    });
});
app.get("/index/shopnow", (req,res)=>{
    res.sendFile(__dirname + '/index/shopnow.html');
});

app.get("/index/register", (req,res)=>{
    res.sendFile(__dirname + '/index/register.html');
});
app.post("/index/register", async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,saltRounds)
        users.push({
                id: Date.now().toString(),
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword,
            })
            res.redirect('/homepage')
    } catch  {
        res.redirect(__dirname +'/index/register.html')
    }
    console.log(users);
});

app.get("/index/login", (req,res)=>{
    res.sendFile(__dirname + '/index/login.html');
});
app.post("/index/login",(req,res)=>{

});
app.get("/homepage", (req,res)=>{
    res.sendFile(__dirname + '/homepage.html');
});

// app.get("/login", (req,res)=>{
//     res.sendFile(__dirname + '/sho.html');
// });
app.listen(3000 , () => console.log("server running on the port 3000"));