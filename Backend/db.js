const mongoose=require('mongoose');
const uri='mongodb://0.0.0.0:27017/';

const connectToMongo=async()=>{

await mongoose.connect(uri);
console.log('Successfull')
}
module.exports=connectToMongo;