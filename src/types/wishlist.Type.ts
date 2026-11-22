import { BrandIF } from "./brand.type"
import { CategoryIF } from "./category.type"
import { SubcategoryIF } from "./subcategories.type"

export interface insitalState {
  status: string
  count: number
  data: WishListIF
}

export interface WishListIF {
  sold: number
  images: string[]
  subcategory: SubcategoryIF
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
  __v: number
  id: string
}



