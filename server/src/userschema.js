const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    usermessage:{
        type:String,
    },
    
    openaimessage:{
        type:String,
    }
})

const User=mongoose.model('chatbot',userschema);
module.exports=User;