const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const express = require('express');
// const app = require('../express.js');

const router = express.Router();
const thisTime = new Date()

router.route('/get-this-time')
    .get((req, res)=>{
        return res.status(200).send("This time is " + thisTime.getDate() + "/"
        + (thisTime.getMonth()+1)  + "/" 
        + thisTime.getFullYear() + " "  
        + thisTime.getHours() + ":"  
        + thisTime.getMinutes() + ":" 
        + thisTime.getSeconds())
    })

router.route('/register')
    .post(authController.register) 

router.route('/login')
    .post(authController.login) 


module.exports = router