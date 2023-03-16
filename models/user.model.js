const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
        maxLength: 50
    },
    hashed_password: {
        type: String,
    },
    name:{
        type: String,
    },
    dob: {
        type: Date,
        required: false,
    },
    sex:{
        //0: nu
        //1: name
        //2: khac
        type: Number,
    },
    salt: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date,
    avatar: {
        type: String
    },
    favorites: [{manga_id: String}],
    // following: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
    // follwers: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
})

UserSchema.virtual('password')
    .set(function(password){
        console.log(password);
        this.salt = this.makeSalt(),
        this.hashed_password = this.encryptPassword(password)
    })

// UserSchema.path('hashed_password').validate(function(v){
//     if(this._password && this._password < 8 || this_password){
//         this.invalidate('password', "Mật khẩu ít nhất có 8 kí tự")
//     }

//     if (this.isNew && !this._password) {
//         this.invalidate('password', 'Vui lòng nhập mật khẩu')
//         }
// }, null)

UserSchema.methods = {
    authenticate: function(password){
        return this.encryptPassword(password).localeCompare(this.hased_password)
      },
    encryptPassword: function(password) {
        if(!password) return '';
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch(err){
            return '';
        }
    },

    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

module.exports = mongoose.model('users', UserSchema)