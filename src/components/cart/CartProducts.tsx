
"use client"

import { Card, CardContent } from '../ui/card'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { CartDataIF, CartProduct } from '@/types/cart.types';
import Image from 'next/image';
import { removeProductFromCart, updateCartProductQuantity } from '@/actions/cart.actions';
import { toast } from 'sonner';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function CartProducts({Product , setProducts ,setCartData} : {Product : CartProduct , setProducts: Dispatch<SetStateAction<CartProduct[] | []>> , setCartData : (CartData : CartDataIF)=>void}) {

  // console.log(Product)

    const quantityButtonDisabledStyles =
  "disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:hover:bg-muted disabled:hover:text-muted-foreground";

  const {handleCart} = useContext(CartContext)!

  async function deleteCart(id : string){
    try {
      const response = await removeProductFromCart(id)
      // console.log(response)
      toast.success(response.message)
      setProducts(response.data.products)
      handleCart()
      setCartData(response)
    } catch (error) {
      console.log(error)
      toast.error("Error in Delete Product")
    }
  }


  async function updateCart (id : string , count : number){
    try {
      const response = await updateCartProductQuantity(id , count)
      // console.log(response)
      toast.success(response.message)
      setProducts(response.data.products)
      handleCart()
      setCartData(response)
    } catch (error) {
      console.log(error)
      toast.error("Error in Update Product")
    }
  }

  return (
    <>
    <Card className="rounded-2xl py-0 shadow-sm">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
              <div className="flex size-28 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Image src={Product.product.imageCover} alt={Product.product.title} width={200} height={200}/>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-lg font-semibold">{Product.product.title}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-0.5 text-primary">
                      {Product.product.category.name}
                    </span>
                    
                  </div>
                </div>

                <p className="font-bold text-primary">
                  {Product.price} EGP{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    per unit
                  </span>
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-input p-1">
                    <Button
                    onClick={()=>updateCart(Product.product._id , Product.count - 1) }
                    disabled={Product.count == 1}
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Decrease quantity"
                      className={quantityButtonDisabledStyles}
                    >
                      <Minus />
                    </Button>
                    <span className="min-w-6 text-center font-medium">{Product.count}</span>
                    <Button
                    onClick={()=>updateCart(Product.product._id , Product.count + 1) }
                      size="icon-sm"
                      aria-label="Increase quantity"
                      className={quantityButtonDisabledStyles}
                    >
                      <Plus />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">
                        {Product.count * Product.price + " "}
                        <span className="text-sm font-normal text-muted-foreground">
                          EGP
                        </span>
                      </p>
                    </div>
                    <Button
                    onClick={()=>deleteCart(Product.product._id)}
                      variant="destructive"
                      size="icon-lg"
                      aria-label="Remove Woman Shawl"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    </>
  )
}
