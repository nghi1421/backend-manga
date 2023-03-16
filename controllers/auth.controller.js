const users = require('../models/user.model')
const express = require('express');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../config/config');

// const verifyToken = require('../middelware/auth');

const login = async (req, res) => {
    try {
        let user = await users.findOne({
            "username": req.body.username
        })
    
        if (!user)
            return res.status('401').json({
                status: 'failed',
                msg: "User not found"
            })
    
        // if(!user.encryptPassword(req.body.password.lenth())===user.hashed_password.lenth())
        //     return res.status('401').json({
        //         status: 'fail',
        //         msg: "Authorization failed."
        //     })

        if (!user.authenticate(req.body.password)) {
            console.log(user.encryptPassword(req.body.password))
            console.log(user.hashed_password)
            
            return res.status('401').json({
                status: 'fail',
                msg: "Authorization failed."
            })
        }
  
        const token = jwt.sign({
            _id: user._id
        },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: config.JWT_expired
        })

        // res.cookie("t", token, {
        //     expire: new Date() + 9999
        // })
        
        user.hashed_password = undefined
        user.salt = undefined
        return res.json({
            status: "success",
            data: {
                user,
                token,
            }
        })
    } catch (err) {
        console.log(err)
        return res.status('401').json({
            status: 'error',
            msg: err.message
        })
    }
}

const logout = (req, res) => {
    res.clearCookie("t")

    return res.status('200').json({
        message: "signed out"
    })
}

// const requireSignin = expressJwt({
//     secret: config.jwtSecret,
//     userProperty: 'auth'
// })

const hasAuthorization = (req, res, next) => {
const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
        error: "User is not authorized"
        })
    }
    next()
}

const register = async (req, res)=>{
    console.log(req.body.username)
    const newUser = new users(req.body);
    newUser.password = req.body.password

    // newUser.makeSalt();
    // newUser.encryptPassword(req.body.password)
    try{
        await newUser.save();
        const token = jwt.sign({
                _id: newUser._id
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: config.JWT_expired
        })

        newUser.hashed_password = undefined
        newUser.salt = undefined
        return res.status(200).json({
            status: 'success',
            data: {
                newUser,
                token
            }
        })
    }
    catch(error){
        return res.status(400).json({
            status: 'error',
            msg: error.message
        })
    }
}

module.exports =  {
    login,
    logout,
    // requireSignin,
    hasAuthorization,
    register,
}


