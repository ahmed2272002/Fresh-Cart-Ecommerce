"use client";
import React, { useContext, useEffect, useState } from "react";
import { GetLoggedUserWishlist, RemoveProductFromWishlist } from "@/actions/wishlist.actions";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WishListIF } from "@/types/wishlist.Type";
import { Dot, Heart, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { WishlistContext } from "@/context/WishlistContext";


export default function WishList() {

  const [WishProducts, setWishProducts] = useState<WishListIF[]>([])

  const [IsEmpty, setIsEmpty] = useState<boolean>(true)

  const { handleWishlist } = useContext(WishlistContext)!

  async function getWishList(){
    try {
      const response = await GetLoggedUserWishlist()
      console.log(response.data)
      setWishProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWishList()
  }, [])


  async function RemoveFromWishList(id : string){
        try {
            const response = await RemoveProductFromWishlist(id)
            console.log(response)
            if(response.status === "success"){
                toast.success(response.message)
                getWishList()
                handleWishlist()
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
      <section className="top bg-white shadow-xl">
        <div className="container mx-auto">
          <div className="body py-5">
            <div className="bread-crumb mb-5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="text-black text-md font-bold opacity-50 hover:text-black hover:opacity-100"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-black" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-black text-md font-bold">
                      Wishlist
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className=" flex items-center gap-4">
              <div className="icon p-2 bg-red-100 w-fit rounded-md shadow">
                <Heart size={30} className="text-red-500 fill-red-500" />
              </div>

              <div className="title">
                <h2 className=" text-3xl text-black font-black">My Wishlist</h2>
                <p className="text-black opacity-75 text-sm">{WishProducts.length} items saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        WishProducts.length > 0 ? <section className="mt-5">
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Product</TableHead>
                <TableHead className="w-[15%] text-center">Price</TableHead>
                <TableHead className="w-[15%] text-center">Status</TableHead>
                <TableHead className="w-[20%] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {WishProducts.map((wish)=><React.Fragment key={wish._id}>
              <TableRow>
                <TableCell className="font-medium">
                  <div className=" flex items-center gap-2">
                    <Image src={wish.imageCover} width={50} height={50} alt={wish.title} />
                  <div className="space-y-1">
                    <h2>{wish.title}</h2>
                    <h3 className="text-[12px] text-gray-400">{wish.category.name}</h3>
                  </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">{wish.price} EGP</TableCell>
                <TableCell><span className="flex items-center bg-green-100 rounded-md w-fit pe-5 mx-auto text-green-600 font-semibold"><Dot size={40} className="fill-green-500 text-green-500" /> In Stock</span></TableCell>
                <TableCell className="flex items-center gap-4"><div className="w-[70%]"><AddToCartButton productId={wish._id} /></div> <Button onClick={()=>RemoveFromWishList(wish._id)} className="rounded-md  bg-white border border-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white duration-300"><Trash/></Button></TableCell>
              </TableRow>
              </React.Fragment>)}
            </TableBody>
          </Table>
        </div>
      </section>: <>
        <div className="h-[300px] flex flex-col gap-3 justify-center items-center">
          <span className="text-gray-400 bg-gray-200 p-4 rounded-full"><Heart size={50}/></span>
          <h2 className="font-bold text-gray-400 text-4xl">WishList Empty</h2>
        </div>
        </>
      }
    </>
  );
}
