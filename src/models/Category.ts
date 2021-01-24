import { Schema, model, Document } from 'mongoose';
import { CategoryType } from '../types/category';

const CategorySchema: Schema = new Schema({
  categoryID: String,
  image: String,
  name: String,
});

export default model<CategoryType & Document>('Category', CategorySchema);
