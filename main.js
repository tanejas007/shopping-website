// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const websModel = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const saltRounds = 10;
const passport = require('passport');
const router = express.Router();
// const website = websModel.find({});
const initializePassport = require('.//passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    );
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
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
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
app.use(flash());
app.use(function(req,res,next){
    res.locals.messages = require('express-messages')(req,res);
    next();
});
app.get('*' , function(req,res,next){
    res.locals.cart = req.session.cart;
    next();
});

app.use("/indexx",express.static('./indexx'));
app.get("/" , (req,res)=> {
    res.sendFile(__dirname + '/index.html',{name: req.user.name});
});
app.get("/indexx/about" , (req,res)=> {
    res.sendFile(__dirname + '/indexx/about.html');
});
app.get("/indexx/cart" , (req,res,next)=> {
    website.exec(function(err,data){
        if (err)  throwerr;
        res.sendFile(__dirname + '/indexx/cart.html',{data});
    });
});
app.get("/indexx/shopnow", (req,res)=>{
    res.sendFile(__dirname + '/indexx/shopnow.html');
});

app.get("/indexx/register", (req,res)=>{
    res.sendFile(__dirname + '/indexx/register.html');
});
app.post("/indexx/register", async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,saltRounds)
        users.push({
                id: Date.now().toString(),
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword,
            })
            res.redirect('/index')
    } catch  {
        res.redirect(__dirname +'/indexx/register.html')
    }
    console.log(users);
});

app.get("/indexx/login", (req,res)=>{
    res.sendFile(__dirname + '/indexx/login.html');
});
app.post("/indexx/login",passport.authenticate('local',{
    successRedirect: '/index.html',
    failureRedirect: '/indexx/login.html',
    failureFlash: true
}));
app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// app.get("/login", (req,res)=>{
//     res.sendFile(__dirname + '/sho.html');
// });
app.listen(3000 , () => console.log("server running on the port 3000"));