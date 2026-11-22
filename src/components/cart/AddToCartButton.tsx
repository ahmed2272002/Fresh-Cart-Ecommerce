"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { addProductToCart } from '@/actions/cart.actions'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { CartContext } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

// تعديل Manus: count مع set يطبق اختيار تفاصيل المنتج، وincrease يحافظ على سلوك زر قائمة المنتجات.
export default function AddToCartButton({productId, count = 1, quantityMode = "increase", disabled = false} : {productId : string, count?: number, quantityMode?: "set" | "increase", disabled?: boolean}) {

  const [isLoading, setIsLoading] = useState(false)
  const {handleCart} = useContext(CartContext)!
  const route = useRouter()

  async function addToCart(){
    if(isLoading || disabled) return

    setIsLoading(true)
    try {
      const response = await addProductToCart(productId, count, quantityMode)
      toast.success(response?.message || "Cart updated successfully")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update cart"
      console.log(error)
      toast.error(message)
      if(message.includes("Please Login")){
        route.push("/login")
      }
    } finally {
      // تعديل Manus: التحديث بعد اكتمال POST/PUT يعكس العدد النهائي الصحيح في الـbadge.
      await handleCart()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={addToCart}
        disabled={disabled || isLoading}
        className="w-full py-[23px] flex items-center gap-2"
      >
        {isLoading ? <Spinner/> : <><ShoppingCart /> Add to Cart</>}
      </Button>
    </>
  )
}
