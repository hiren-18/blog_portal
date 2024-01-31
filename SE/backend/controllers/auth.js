const Joi =require("joi");
const User=require("../models/users");
const bcrypt =require('bcrypt');
const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const jwt =require('jsonwebtoken'); 
const authController={
    async register(req, res,next){
       
      const userRegisterSchema=Joi.object({
        username:Joi.string().min(5).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(passwordPattern).required(),
        role: Joi.string().valid('admin', 'client').required(),
      })

      const {error}=userRegisterSchema.validate(req.body);

      if(error){
        return next(error);
       }

       const {username,email,password}=req.body;
       try{
        const emailInUse= await User.exists({email});
        const usernameInUse=await User.exists({username});
        if(emailInUse){
            const error={
                status:409,
                message:"Email already registered ,use another email!"
            }
            return next(error);
        }
        if(usernameInUse){
            const error ={
                status:409,
                message:"Uername not available ,choose another username!"
            }
            return next(error);
        }
        
       }catch(error){
  return next(error);
       }
     
       const hashedPassword =await bcrypt.hash(password,10);

       
    
       let user;
  let accessToken;
try{
const userRegister=new User({
  username:username,
  email:email,
  password:hashedPassword,
  role:"client"
});
user=await userRegister.save();

accessToken = jwt.sign(
  { user: { _id: user._id, email: email, roles: ["student"] } },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: '60m',
  }
);
}catch(error){
  return next(error);
}
 res.cookie('accessToken',accessToken,{
  maxAge:1000*60*60*24,
  httpOnly:true
 })
return res.status(201).json({user,auth:true});
      },

      async login(req, res,next){
     const userLoginSchema=Joi.object({
      username:Joi.string().min(5).max(30).required(),
        password:Joi.string().pattern(passwordPattern)
     })

     const {error}=userLoginSchema.validate(req.body);
     if(error){
      return next(error);
     }

     const {username,password}=req.body;
    
     let user;
try{
 user=await User.findOne({username:username});
 if(!user){
  const error={
    status :401,
    message:"invalid username"
  }
  return next(error);
 }

const match=await bcrypt.compare(password,user.password);
if(!match){
  const error={
    status:401,
    message:"invalid password"
  }
  return next(error);
}

}catch(error){
  return next(error);
}
accessToken = jwt.sign(
  { user: { _id: user._id ,role:user.role} },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: '60m',
  }
);

// res.cookie('accessToken',accessToken,{
//   maxAge:1000*60*60*24,
//   httpOnly:true
//  });
return res.status(200).json({accessToken,auth:true})
        },
        async logout(req,res,next){
          res.clearCookie('accessToken');
          res.status(200).json({user:null,auth:false});
        }

      

    }


module.exports=authController;