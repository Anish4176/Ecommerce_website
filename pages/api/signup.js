import User from "@/model/User";
import connectDb from "@/middleware/mongoose";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handler = async (req, res) => {
  
    if (req.method === 'POST') {
        let user = await User.findOne({ 'email': req.body.email });
        if (user) {
            res.status(200).json({ success: false, message: 'Email already exists' });
        }
       
        else {
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            let u = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            await u.save();
            res.status(200).json({success: true, message: 'Signup successful'});

        }
    }
};
export default connectDb(handler);