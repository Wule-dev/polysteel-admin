import { Schema, model, Document } from 'mongoose';
import { ProductType } from '../types/product';
import Category from './Category';

const ProductSchema: Schema = new Schema({
  productID: String,
  image: String,
  name: String,
  title: String,
  description: String,
  category: {
    type: Object,
    ref: Category,
  },
  characteristics: Object,
});

export default model<ProductType & Document>('Product', ProductSchema);
