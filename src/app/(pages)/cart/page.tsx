"use client"
import Link from "next/link";
import {ArrowLeft, ShoppingCart, Trash2,}from "lucide-react";
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import OrderSummary from "@/components/cart/OrderSummary";
import CartProducts from "@/components/cart/CartProducts";
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.actions";
import { useContext, useEffect, useState } from "react";
import { CartDataIF, CartProduct } from "@/types/cart.types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";



export default function CartPage() {

  const [products, setProducts] = useState<CartProduct[] | []>([])
  const [isLoading, setIsLoading] = useState(true)
  const [CartData, setCartData] = useState<CartDataIF|null>(null)
  const {handleCart} = useContext(CartContext)!

  console.log(CartData)

  async function getCart() {
    setIsLoading(true)
    try {
      const response : CartDataIF = await getLoggedUserCart()
      setProducts(response.data.products)
      // console.log(response)
      setCartData(response)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  async function clearCart(){
    try {
      const response = await clearUserCart()
      // console.log(response)
      toast.success(response.message)
      setProducts(response.data.products)
      handleCart()
    } catch (error) {
      console.log(error)
      toast.error("Cart Failed to Clear!")
    }
  }
  

  if(isLoading){
    return<>
    <div className=" flex h-screen justify-center items-center gap-3">
      <Spinner className="size-12"></Spinner> <h2 className=" text-6xl font-black"> Loading...</h2>
    </div>
    </>
  }

  if(products.length == 0){
    return<>
    <div className=" flex flex-col h-screen justify-center items-center gap-3">
      <ShoppingCart className="size-14 text-primary"/>
      <Link href={'/products'}><Button variant="link" className="text-5xl">Go Shopping</Button></Link>
    </div>
    </>
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have <span className="font-semibold text-primary">{products.reduce((acc , product)=> acc + product.count , 0)} item</span> in
          your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {/* cardItems */}

          {products.map((Product)=> <CartProducts key={Product._id} setProducts={setProducts} Product={Product} setCartData={setCartData}/>)}
          
          
          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button onClick={clearCart} variant="ghost" className="text-muted-foreground">
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        
        <OrderSummary CartData = {CartData!} isCheckOut = {false} userId={CartData?.data.cartOwner as string}/>

      </div>
    </div>
  );
}
