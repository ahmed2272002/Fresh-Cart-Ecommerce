"use client";

import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import Navbar from "../common/Navbar/Navbar";
import { Toaster } from "sonner";
import AuthContextProvider from "@/context/AuthContext";
import CartContextProvider from "@/context/CartContext";
import WishlistContextProvider from "@/context/WishlistContext";
import Footer from "../common/Footer/Footer";

export default function ProviderComponent({children}: {children: React.ReactNode;}) {
  return (
    <>
    <AuthContextProvider>
        <CartContextProvider>
            <WishlistContextProvider>
              <Provider store={store}>
                  <Navbar />
                  <Toaster richColors position="top-center" />
                  {children}
                  <Footer/>
              </Provider>
            </WishlistContextProvider>
        </CartContextProvider>
    </AuthContextProvider>
    </>
  );
}
