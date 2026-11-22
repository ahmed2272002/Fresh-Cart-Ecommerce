import { productIF } from "@/types/product.type";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import WishListButton from "../wishlist/WishListButton";

export default function ProductsGrid({ products , wishlistIds }: { products: productIF[] , wishlistIds:string[] }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-6 text-xl font-bold ps-3 relative before:absolute before:h-full before:w-1 before:rounded-xl before:top-0 before:left-0 before:bg-gradient-to-b before:from-green-500 before:to-green-900">Featured <span className="text-green-700">Products</span></h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="p-4 flex flex-col justify-between relative">
            <div className=" absolute top-2 right-2 z-10"><WishListButton ProductId ={product._id} initialIsWishlisted = {wishlistIds.includes(product._id)}/></div>
            <Link href={`/products/${product._id}`}>
              <div>
                <Image src={product.imageCover} alt={product.title} width={200} height={200} className="w-full h-40 object-cover rounded-lg" />
              </div>
              <p className="text-xs text-gray-500 mt-2">{product.category.name}</p>
              <h3 className="text-sm font-semibold mt-1 truncate">{product.title}</h3>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs ml-1">{product.ratingsAverage}</span>
              </div>
              <p className="text-sm font-bold mt-2">{product.price} EGP</p>
            </Link>
            <div className="mt-3">
              <AddToCartButton productId={product._id} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
