import User from "@/model/User";
import connectDb from "@/middleware/mongoose";
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const handler=async(req,res)=>{
    try{
        if(req.method==='POST'){
           let user=await User.findOne({'email':req.body.email});
           let compare= bcrypt.compareSync(req.body.password , user.password); // true
           if(user){
            if(compare){
              let  token = jwt.sign({email:user.email, password:user.password }, process.env.JWT_SECRET,{
                expiresIn:'2d'
              });
             
              res.status(200).json({success:true,token,useremail:user.email});
            }  
            else{
                res.status(200).json({success:false, error:'Invalid Credentials'})
            }
           }
           else{
            res.status(200).json({success:false, error:'User does not exist'})
           }
             
        }
    }
    
    catch(err){
        res.status(500).json({error:err});
    }
};
export default connectDb(handler);