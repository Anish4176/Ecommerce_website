import connectDb from "@/middleware/mongoose";
import User from "@/model/User";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import mongoose from "mongoose";
const saltRounds = 10;

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let token = req.body.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ 'email': decoded.email });

        if (user) {
            let compare = await bcrypt.compare(req.body.password, user.password); // true
            if (compare) {
                const hash = bcrypt.hashSync(req.body.newpassword, saltRounds);
                user = await User.findOneAndUpdate({ 'email': decoded.email }, { 'password': hash });
                res.status(200).json({ success: true });
            }
            else {
                res.status(200).json({ success: false, error: 'Enter Correct Password' })
            }
        }
    }
    else {
        res.status(400).json({ error: 'error' });
    }
}


export default connectDb(handler);  