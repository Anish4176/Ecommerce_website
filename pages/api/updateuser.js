import connectDb from "@/middleware/mongoose";
import User from "@/model/User";
const jwt = require('jsonwebtoken');
import mongoose from "mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let token = req.body.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOneAndUpdate({ 'email': decoded.email },{'name': req.body.name,'address':req.body.address,'phone':req.body.phone,'pincode':req.body.pincode});
       
        res.status(200).json({success: true});
    }
    else {
        res.status(400).json({ error: 'error' });
    }

}

export default connectDb(handler);              