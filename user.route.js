const express=require("express")
const controller=require('../controller/user.controller')
const auth = require("../controller/middlewareforauth")

module.exports=(app)=>{
    app.post("/signup",controller.signup)
    app.post("/sigin",controller.signin)
    app.get("/user",auth,controller.getuserinfo)
}