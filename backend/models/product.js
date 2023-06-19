import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  productLink: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  productPrice: {
    type: String,
  },
  productDescription: {
    type: String,
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
