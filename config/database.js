module.exports = {
    database: 'mongodb://localhost:27017/website'
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/website',{useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;
var websiteSchema = new mongoose.Schema({
    item :String,
    price : Number,
    quantity : Number,
    total : Number,
    delivery_charge :Number,
});
websiteSchema.methods.subtotal=function(){
    return this.delivery_charge +(this.quantity * this.price);
}
var websiteModel = mongoose.model('Website' , websiteSchema);
var website = new websiteModel({item : 'clinic plus',
    price : '75',
    quantity : '1',
    delivery_charge : '50'
});
website.total = website.subtotal();
db.on("connected" , function(){
    console.log("connected succesfully");
});
db.on("disconnected" , function(){
    console.log("disconnected succesfully");
});
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
    website.save(function(err,res){
if (err) throw error;
console.log(res);
db.close();
    });
});