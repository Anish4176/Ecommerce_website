import Product from "@/model/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let products = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                price: req.body[i].price,
                img: req.body[i].img,
                size: req.body[i].size,
                color: req.body[i].color,
                category: req.body[i].category,
                availableQty: req.body[i].availableQty,
            })
            await products.save();

        }
        res.status(200).json({ success: 'success' });
    }
    else {
        res.status(400).json({ error: 'this method is not allowed' });
    }
};
export default connectDb(handler);


