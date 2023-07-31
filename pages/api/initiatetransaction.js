import connectDb from "@/middleware/mongoose";
import Order from "@/model/Order";
import Product from "@/model/Product";
import pincodes from '../../thunder-tests/pincode.json';

const handler = async (req, res) => {
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }


    //check if the cart is tampered  
    let cart = req.body.cart;
    let sumtotal = 0;
    for (let item in cart) {
        let itemproduct = await Product.findOne({ slug: item });
        sumtotal += cart[item].price * cart[item].qty;
        //check if the item is out of stock 
        if (itemproduct.availableQty < cart[item].qty) {
            res.status(200).json({ success: false, error: 'Some items in your cart is out of stock!', clearcart: false })
            return;
        }
        if (itemproduct.price != cart[item].price) {
            res.status(200).json({ success: false, error: 'Your cart has been tampered', clearcart: true })
            return;
        }
    }


    //check if the details are valid ---[pending]
    if (req.body.phone.length != 10 || !isNumeric(req.body.phone)) {
        res.status(200).json({ success: false, error: 'Please enter your 10 digit phone number', clearcart: false })
        return;
    }
    if (req.body.pincode.length != 6 || !isNumeric(req.body.pincode)) {
        res.status(200).json({ success: false, error: 'Please enter your 6 digit pincode', clearcart: false })
        return;
    }
    if (req.body.address.length == 0) {
        res.status(200).json({ success: false, error: 'Please Enter Your address', clearcart: false })
        return;
    }
    if (req.body.name.length == 0) {
        res.status(200).json({ success: false, error: 'Please Enter Your Name', clearcart: false })
        return;
    }
    //check if pincode is servicable
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
        res.status(200).json({ success: false, error: 'Sorry! We do not deliver to this pincode yet', clearcart: false })
        return;
    }


    try {
        let orderdetails = new Order({
            email: req.body.email,
            orderid: req.body.orderId,
            products: req.body.cart,
            amount: req.body.subtotal,
            address: req.body.address,
            phone: req.body.phone,
            pincode: req.body.pincode,
            name: req.body.name,
            status: 'success'
        })
        let a = await orderdetails.save();
        for (let slug in a.products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { 'availableQty': - a.products[slug].qty } })
        }

        res.status(200).json({ success: true })


    } catch (err) {
        res.status(200).json({ success: false, error: 'Some error occured', clearcart: false })
    }

}

export default connectDb(handler);