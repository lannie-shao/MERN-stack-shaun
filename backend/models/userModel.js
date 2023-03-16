const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
})

//static sign up method including hash the password
userSchema.statics.signup=async function(email,password) {
    //validation first
    if(!email||!password){
        throw Error ('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Must be a valid email address')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    
    const exist=await this.findOne({email})
    if(exist){
        throw Error('Email already in use')
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const user=await this.create({email,password:hash})
    return user
}

module.exports=mongoose.model('User',userSchema)