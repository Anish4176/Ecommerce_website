const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email:{type:String ,required: true},
    orderid:{type:String ,required: true},
    // paymentinfo:{type:String ,default:''},
    products:{type:Object,required:true},
    amount:{type:String ,required:true},
    address:{type:String ,required: true},
    phone:{type:Number ,required: true},
    pincode:{type:Number ,required: true},
    name:{type:String ,required:true},
    status:{type:String ,default:'Pending', required: true}
},{timestamps:true});
mongoose.models={}
export default mongoose.model("Order",OrderSchema);