"use client";
import { useContext, useEffect, useState } from "react";
import {
  AddProductToWishlist,
  RemoveProductFromWishlist,
} from "@/actions/wishlist.actions";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishListButton({
  ProductId,
  initialIsWishlisted,
}: {
  ProductId: string;
  initialIsWishlisted: boolean;
}) {
  const [AddToWish, setAddToWish] = useState<boolean>(!!initialIsWishlisted);
  const path = usePathname();
  const { handleWishlist } = useContext(WishlistContext)!;

  useEffect(() => {
    setAddToWish(!!initialIsWishlisted);
  }, [initialIsWishlisted]);

  async function AddToWishList(id: string) {
    try {
      const response = await AddProductToWishlist(id);
      if (response.status === "success") {
        toast.success(response.message);
        setAddToWish(true);
        handleWishlist();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RemoveFromWishList(id: string) {
    try {
      const response = await RemoveProductFromWishlist(id);
      if (response.status === "success") {
        toast.success(response.message);
        setAddToWish(false);
        handleWishlist();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        onClick={
          AddToWish
            ? () => RemoveFromWishList(ProductId)
            : () => AddToWishList(ProductId)
        }
        className={
          path === "/products" || path === "/" || path === "/searchPage"
            ? "bg-white shadow p-3 rounded-full"
            : path === `/products/${ProductId}`
              ? "border-1 w-full flex justify-center items-center rounded-4xl"
              : ""
        }
      >
        <Heart
          size={20}
          className={
            AddToWish
              ? "text-red-500 fill-red-500 duration-200"
              : "text-gray-600 fill-transparent duration-200"
          }
        />
        {path === "/products" || path === "/" || path === "/searchPage" ? (
          ""
        ) : (
          <span className="ms-2 font-semibold">Add To WishList</span>
        )}
      </button>
    </>
  );
}
