export type OptionType = {
  id: string,
  key: string,
  name: string,
  position: number,
  image: string,
}

export type AttributeType = {
  id: string,
  key: string,
  name: string,
  visible: boolean,
  options: OptionType[]
}

export type ProductType = {
  id: string,
  name: string,
  description: string,
  hasCustomFormat: boolean,
  images: string[],
  category: string[],
  price: number,
  measure: string,
  attributes: AttributeType[] | null
}
