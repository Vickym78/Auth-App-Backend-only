const mongoose= require("mongoose")
let user_det= new mongoose.Schema({
   name:{
        type:String,
        require:[true, "USER NAME IS REQUIRED"]

   },
   email:{
type:String,
require:[true, "mail id IS REQUIRED"]
   },
   password:{
    type:String,
    select: false
   },
   confirm_password:{
    type:String,
   }

},{timestamps:true})




module.exports= mongoose.model("my_documents",user_det)