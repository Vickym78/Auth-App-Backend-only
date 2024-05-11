const jwt = require("jsonwebtoken");
require("./user.controller")

const jwtauth =(req,res,next)=>{

let token  = (req.cookies && req.cookies.token)
if(!token){
    return res.send("Unable to  find user details")
}

try{
        const payload = jwt.verify(token ,secretKey)
        req.user ={
            id:payload.id,
            email:payload.email
        }
}
catch(e){
    return res.send(e.message)
}

    next();
}


module.exports= jwtauth