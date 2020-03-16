const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function inititalize(passport) {
    const authenticateUser = (email,password,done) =>{
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'NO User With That email'})
        }
        
    }   
}