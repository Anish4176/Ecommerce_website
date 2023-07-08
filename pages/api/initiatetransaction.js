import connectDb from "@/middleware/mongoose";
import Order from "@/model/Order";

const handler = async (req, res) => {

    //check if the cart is tampered  ---[pending]

    //check if the item is out of stock ---[pending]

    //check if the details are valid ---[pending]
    try {
        let orderdetails = new Order({
            email: req.body.email,
            orderid: req.body.orderId,
            products: req.body.cart,
            amount: req.body.subtotal,
            address: req.body.address,
            status: 'success'
        })
       let a= await orderdetails.save();
       console.log('this is a '+ a);
        res.status(200).json({ success: true })
        
        // let order=await Order.findById({orderid: req.body.orderId})
        
        // res.redirect(`/order?id=` + order._id ,200)
      

    } catch (err) {
        res.status(200).json({ success: false, error: 'Some error occured' })
    }

}

export default connectDb(handler);