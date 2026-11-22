"use client";

import { GetLoggedUserWishlist } from '@/actions/wishlist.actions';
import { WishListIF } from '@/types/wishlist.Type';
import { useSession } from 'next-auth/react';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

type WishlistContextType = {
  numberOfWishlistItems: number;
  handleWishlist: () => void;
  setNumberOfWishlistItems: Dispatch<SetStateAction<number>>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState<number>(0);
  const session = useSession();

  async function handleWishlist() {
    try {
      const response = await GetLoggedUserWishlist();
      const numOfItems = response.data.length || 0;
      setNumberOfWishlistItems(numOfItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      handleWishlist();
    }
  }, [session.status]);

  return (
    <WishlistContext.Provider value={{ numberOfWishlistItems, handleWishlist, setNumberOfWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
}
