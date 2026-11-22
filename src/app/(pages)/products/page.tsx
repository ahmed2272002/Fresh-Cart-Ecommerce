import { getAllProduct } from "@/services/product.service";
import { productIF } from "@/types/product.type";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { PackageOpen, Star } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddToCartButton from "@/components/cart/AddToCartButton";
import WishListButton from "@/components/wishlist/WishListButton";
import { GetLoggedUserWishlist } from "@/actions/wishlist.actions";



export default async function Products() {
  const response = await getAllProduct(null);
  
  const products: productIF[] = response.data;
  // console.log(products[0]);

  

  let wishlistIds: string[] = [];

  try {
    const wishlistResponse = await GetLoggedUserWishlist();

    wishlistIds = wishlistResponse.data.map(
      (item: any) => item._id
    );

  } catch (error) {
    console.log("Wishlist is unavailable:", error);
  }

  return (
    <React.Fragment>
      <section className="top bg-green-500">
        <div className="container mx-auto">
          <div className="body py-5">
            <div className="bread-crumb mb-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white text-md font-bold opacity-80 hover:text-white hover:opacity-100">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white text-md font-bold">Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className=" flex items-center gap-4">
            <div className="icon p-3 bg-[#4bc779] w-fit rounded-xl shadow">
              <PackageOpen size={30} className="text-white" />
            </div>

            <div className="title">
              <h2 className=" text-3xl text-white font-black">All Products</h2>
              <p className="text-white opacity-75 text-sm">Explore our complete product collection</p>
            </div>
          </div>
          </div>
        </div>
      </section>


      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-7 my-6">
          {/* map */}
          {products.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <div className="col-span-3">
                  <Card className="relative mx-auto w-full max-w-sm pt-0 h-full flex flex-col justify-between">
                    <div className=" absolute top-2 z-30 right-2">
                      <WishListButton ProductId={product._id} initialIsWishlisted={wishlistIds.includes(product._id)}/>
                    </div>
                    <Link href={`/products/${product._id}`}>
                        <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="relative z-20 aspect-video w-full object-cover"
                      />
                      
                      <CardHeader>
                        <p className="text-[13px] text-gray-400">
                          {product.category.name}
                        </p>
                        <CardTitle className="text-xl font-semibold">
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </CardTitle>
                        <div className=" flex items-center">
                          {[0, 1, 2, 3, 4].map((star, index) => {
                            const filledStar =
                              star < Math.floor(product.ratingsAverage);
                            // 0<3 true , 1<3 true , 2<3 true , 3<3 false, 4<3 false
                            return (
                              <React.Fragment key={index}>
                                <Star
                                  size={17}
                                  className={
                                    filledStar
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-400 fill-gray-400"
                                  }
                                />
                              </React.Fragment>
                            );
                          })}
                          <span className="ms-auto text-md font-semibold">
                            {product.ratingsAverage}
                          </span>
                        </div>
                        <CardDescription>
                          {product.description.split(" ").slice(0, 6).join(" ")}
                          ...
                        </CardDescription>
                        <h3 className=" text-2xl font-semibold ">
                          {product.price}EGP
                        </h3>
                      </CardHeader>
                    </Link>

                    <CardFooter>
                      <AddToCartButton productId ={product._id}/>
                    </CardFooter>
                  </Card>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
