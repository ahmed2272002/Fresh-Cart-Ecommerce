"use client"
import { Card, CardContent } from '../ui/card'
import { Lock, ShoppingBag, Tag, Truck } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { CartDataIF } from '@/types/cart.types'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function OrderSummary({
  CartData,
  isCheckOut,
  isSubmitting = false,
  userId
}: {
  CartData: CartDataIF;
  isCheckOut: boolean;
  isSubmitting?: boolean;
  userId:string
}) {

  // console.log(CartData)
  const {numberOfCartItems} = useContext(CartContext)!

  return (
    <>
    <div className="col-span-12 lg:col-span-4">
          <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
            <div className="bg-primary p-5 text-primary-foreground">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="size-5" />
                Order Summary
              </h2>
              <p className="mt-1 text-sm">{numberOfCartItems} item in your cart</p>
            </div>

            <CardContent className="space-y-4 p-5">
              {isCheckOut ? <>
              <div className='h-[200px] overflow-y-scroll flex flex-col gap-2'>
              {CartData.data.products.map((product)=>
              <div key={product._id} className=' flex gap-2 items-center bg-gray-100 p-3 px-4 rounded-xl'>
                <Image src={product.product.imageCover} width={70} height={70} alt={product.product.title}></Image>
                <div className='flex justify-between w-full'>
                  <div>
                    <h2 className='font-bold text-[13px]'>{product.product.title.split(" ").slice(0 , 3).join(" ")}</h2>
                    <p className='text-[11px] text-gray-400'>{product.count} * {product.price} EGP</p>
                  </div>
                  <span className=' font-bold'>{product.price * product.count} EGP</span>
                </div>
              </div>
              )}
              </div>
              </> : <>
              <div className="space-y-2 rounded-xl bg-orange-50 p-4">
                <p className="flex items-center gap-2 text-sm">
                  <Truck className="size-4 text-orange-500" />
                  Free EGP for free shipping
                </p>
                <div className="h-2 rounded-full bg-orange-100">
                  <div className="h-full w-full rounded-full bg-orange-500" />
                </div>
              </div>
              </>}

              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{CartData?.data?.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">
                  {CartData?.data?.totalCartPrice} {" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    EGP
                  </span>
                </span>
              </div>

              <Button type="button" variant="outline" className="h-12 w-full border-dashed">
                <Tag />
                Apply Promo Code
              </Button>

              {isCheckOut ? (
                <Button type="submit" size="lg" className="h-12 w-full" disabled={isSubmitting}>
                  <Lock />
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              ) : (
                <Link href={`/checkout?userId=${userId}`}>
                <Button size="lg" className="h-12 w-full">
                  <Lock />
                  Secure Checkout
                </Button>
                </Link>
              )}

              
            </CardContent>
          </Card>
        </div>
    </>
  )
}
