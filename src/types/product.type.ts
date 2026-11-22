import { BrandIF } from "./brand.type"
import { CategoryIF } from "./category.type"
import { SubcategoryIF } from "./subcategories.type"

export interface productIF {
  sold: number
  images: string[]
  subcategory: SubcategoryIF[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryIF
  brand: BrandIF
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?:number,
  availableColors?: number[]
}
