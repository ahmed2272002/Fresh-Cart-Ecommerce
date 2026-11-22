"use client"

import { getLoggedUserCart } from '@/actions/cart.actions'
import { CartDataIF } from '@/types/cart.types'
import { useSession } from 'next-auth/react'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'


type cartContextType = {
  numberOfCartItems : number,
  handleCart: ()=> void,
  setNumberOfCartItems : Dispatch<SetStateAction<number>>
}

export const CartContext = createContext<cartContextType | null>(null)


export default function CartContextProvider({children} : {children : ReactNode}) {

  const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0)
  const session = useSession()
  
  
  async function handleCart(){
    try {
      const response : CartDataIF = await getLoggedUserCart()
      // console.log(response)
      const numOfItems = response.data.products.reduce((acc , product)=> acc + product.count , 0)
      setNumberOfCartItems(numOfItems)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(session.status === "authenticated"){
      handleCart()
    }
    
  }, [session.status])
  

  return (
    <>
     <CartContext.Provider value={{numberOfCartItems , handleCart , setNumberOfCartItems}}>
      {children}
     </CartContext.Provider>
    </>
  )
}
