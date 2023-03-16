const user = require('../models/user.model')
// const {cloudinary, resize} = require('cloudinary')
// const imageDefault = require('../asset/avatar.png')

// const cldInstance = new cloudinary({cloud: {cloudName: 'dxigrer23'}});

// const myImage = cldInstance
//   .image(imageDefault)
//   .setDeliveryType('fetch')
//   .resize(resize.fill().width(100).height(150))

const create =  async (req, res)=>{
    const newUser = new user(req.body);
    try{
        await newUser.save();
        return res.status(200).json({
            status: 'success',
            data: newUser,
        })
    }
    catch(err){
        return res.status(400).send(err.message);
    }
} 

const updateProfile = async (req, res)=>{
    // const
    try{ 
        let user = await user.findOneAndUpdate({username: req.body.username},{
            sex: req.body.sex,
            name: req.body.name,
            dob: req.body.dob,
        })
        if(user){
            return res.status(200).json({
                status: 'success',
                data: newUser,
            })
        }
        else{
            return res.status(400).json({
                status: 'fail',
                msg: 'fail to update profile'
            });
        }

    }
    catch(err){
        return res.status(400).send(err.message);
    }
}

const findById = async (req, res)=>{
    try{
        // let user = findOne(req.body.id)

    }
    catch(err){
        return res.status(400).send(err.message);
    }
}

const addFavorite = async (req, res)=>{
    try{
        // let user = findOne(req.body.id)

    }
    catch(err){
        return res.status(400).send(err.message);
    }
}

const removeFavorite = async (req, res)=>{
    try{
        // let user = findOne(req.body.id)

    }
    catch(err){
        return res.status(400).send(err.message);
    }
}
module.exports = {
    create,
    updateProfile,
    findById,
    addFavorite,
    removeFavorite
}