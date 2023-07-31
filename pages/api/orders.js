import connectDb from "@/middleware/mongoose";
import Order from "@/model/Order";
const jwt = require('jsonwebtoken');
import mongoose from "mongoose";

const handler = async (req, res) => {

    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        let token = req.body.token;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        let order = await Order.find({ email: decoded.email });
        res.status(200).json(order);

    } catch (err) {
        res.status(200).json(err)
    }

}

export default connectDb(handler);