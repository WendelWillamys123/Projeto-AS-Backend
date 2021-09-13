const mongoose = require ("mongoose");
const UserSchema= require ("../models/User");

const User = mongoose.model ("User", UserSchema);

class UserData {
    getUser () {
        return User;
    }
}

module.exports = UserData;