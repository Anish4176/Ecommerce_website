import connectDb from "@/middleware/mongoose";
import User from "@/model/User";
const jwt = require('jsonwebtoken');
import mongoose from "mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let token = req.body;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        let user = await User.findOne({ 'email': decoded.email });
        let { name, email, address, pincode,phone } = user
        res.status(200).json({ name, email, address, pincode,phone });
    }
    else {
        res.status(400).json({ error: 'error' });
    }

}

export default connectDb(handler);