"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Counter from "@/components/products/Counter"
import ProductTotalPrice from "@/components/products/totalPrice"
import AddToCartButton from "@/components/cart/AddToCartButton"
import { Zap } from "lucide-react"


export default function ProductPurchaseControls({productId, price, stock} : {productId: string, price: number, stock: number}) {
  const [count, setCount] = useState(1)

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex flex-wrap items-center gap-4">
          <Counter count={count} setCount={setCount} maxCount={stock} />
          <span className="text-sm text-muted-foreground">
            {stock} available
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
        <span className="text-sm font-medium">Total Price:</span>
        <ProductTotalPrice price={price} count={count} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <AddToCartButton productId={productId} count={count} quantityMode="set" disabled={stock < 1} />

        <Button
          size="lg"
          className="h-12 gap-2 bg-foreground text-background hover:bg-foreground/90"
          disabled={stock < 1}
        >
          <Zap />
          Buy Now
        </Button>
      </div>
    </>
  )
}
