
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: String
});

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const userModel = mongoose.model('Users', userSchema);


module.exports = userModel;