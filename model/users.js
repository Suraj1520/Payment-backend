const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscription:{
        planName:{
            type:String,
        },
        planPrice:{
            type:String,
        },
        billingCycle:{
            type:String,
        },
        planDevice:[],
        isActive:{
            type:Boolean,
        },
        createdOn:{
            type:Date,
        },
        cancelledOn:{
            type:Date,
        }
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;