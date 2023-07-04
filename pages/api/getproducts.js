import Product from "@/model/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    const getproduct = await Product.find();
    const tshirt={};
    
    for(let items of getproduct){
      if(items.title in tshirt){
        if( !tshirt[items.title].color.includes(items.color) && items.availableQty >0){
          tshirt[items.title].color.push(items.color);
        }
        if( !tshirt[items.title].size.includes(items.size) && items.availableQty >0){
          tshirt[items.title].size.push(items.size);
        }
      }
      else{
        tshirt[items.title] = JSON.parse(JSON.stringify(items));
        if(items.availableQty >0){
          tshirt[items.title].color=[items.color];
          tshirt[items.title].size=[items.size];
        }
      }
    }

    res.status(200).json({ tshirt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export default connectDb(handler);


