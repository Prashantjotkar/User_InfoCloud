const mongoose=require('mongoose');

const { Schema } = mongoose;

// eslint-disable-next-line no-undef
const UserSchema =new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
,
password:{
    type:String,
    require:true
},
date:{
    type:Date,
    default:Date.now

}


})
module.exports=mongoose.model("user",UserSchema);