import { CategoryType } from './category';

export type ProductType = {
  productID: string,
  image: string,
  name: string,
  title: string,
  description: string,
  category: {
    type: CategoryType,
    ref: any,
  },
  characteristics: Object,
}
