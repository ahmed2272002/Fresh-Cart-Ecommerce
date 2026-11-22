import { BrandIF } from "./brand.type"
import { CategoryIF } from "./category.type"
import { SubcategoryIF } from "./subcategories.type"

export interface ProductDetailsIF {
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
  priceAfterDiscount: number
  imageCover: string
  category: CategoryIF
  brand: BrandIF
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  reviews: Review[]
  id: string
}

export interface Review {
  _id: string
  rating: number
  review: string
  product: string
  user: User
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
  _id: string
  name: string
}
