import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        required : true,
        defualt : false
    }

}, {
    timestamps : true
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;