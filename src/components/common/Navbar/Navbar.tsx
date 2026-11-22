"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gift,
  Headset,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { NAV_LINKS } from "./navbar-links"
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const iconButtonClassName =
  "h-10 w-10 rounded-full text-[#21313C] hover:bg-[#f0faf0] hover:text-[#0AAD0A]";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const {counter} = useSelector((state : RootState)=>(state.counter))

  const session = useSession()
  // console.log(session)

  const {numberOfCartItems} = useContext(CartContext)!
  const {numberOfWishlistItems} = useContext(WishlistContext)!

  function signOutUser(){
    signOut({
      redirect: true,
      callbackUrl : "/login"
    })
  }

  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="hidden border-b border-slate-100 bg-[#f8faf8] sm:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between gap-4 px-4 text-[11px] text-slate-600 sm:px-6">
          <div className="flex min-w-0 items-center gap-5">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Gift className="h-3.5 w-3.5 text-[#0AAD0A]" aria-hidden="true" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:inline-flex">
              <Gift className="h-3.5 w-3.5 text-[#0AAD0A]" aria-hidden="true" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <a className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#0AAD0A]" href="tel:+18001234567">
              <Phone className="h-3 w-3" aria-hidden="true" />
              +1 (800) 123-4567
            </a>
            <a className="hidden items-center gap-1.5 whitespace-nowrap hover:text-[#0AAD0A] lg:inline-flex" href="mailto:support@freshcart.com">
              <Mail className="h-3 w-3" aria-hidden="true" />
              support@freshcart.com
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center gap-4 lg:gap-6">
          <Link className="shrink-0" href="/" aria-label="FreshCart home">
            <Image
              src={logo}
              alt="FreshCart"
              width={160}
              height={31}
              priority
              className="h-auto w-[132px] sm:h-[31px] sm:w-[160px]"
            />
          </Link>

          <div className="hidden min-w-0 max-w-[430px] flex-1 items-center rounded-full border border-slate-200 bg-white md:flex">
            <input
              aria-label="Search products"
              className="h-10 w-full min-w-0 flex-1 bg-transparent px-4 text-sm text-[#21313C] outline-none placeholder:text-slate-400"
              placeholder="Search for products, brands and more..."
              type="search"
            />
            <Link href={'/searchPage'}>
              <Button
                aria-label="Search"
                className="mr-1 h-8 w-8 rounded-full bg-[#0AAD0A] p-0 text-white hover:bg-[#099909]"
                size="icon"
                type="button"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
            {NAV_LINKS.map((item) => (
              <Link
                className="whitespace-nowrap text-sm font-medium text-[#21313C] transition-colors hover:text-[#0AAD0A]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0faf0] text-[#0AAD0A]">
              <Headset className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-[11px] leading-tight text-slate-500">
              Support
              <strong className="block font-semibold text-[#21313C]">24/7 Help</strong>
            </span>
          </div>

          <div className="ml-auto flex shrink-0 items-center ">
            {
              session.status === "unauthenticated" ? null : <>
              <Button asChild className={iconButtonClassName} size="icon" variant="ghost">
              <Link aria-label="Wishlist" href="/wishlist">
                <div className="relative">
                  <Heart className="h-[19px] w-[19px]" aria-hidden="true" />
                  <Badge variant="destructive" className="absolute -top-3 -right-4 text-[10px] p-1 min-w-[20px] h-5 rounded-full flex items-center justify-center">{numberOfWishlistItems}</Badge>
                </div>
              </Link>
            </Button>
            <Button asChild className={iconButtonClassName} size="icon" variant="ghost">
              <Link aria-label="Cart" href="/cart">
                <div className=" relative">
                  <ShoppingCart className="h-[19px] w-[19px]" aria-hidden="true" />
                  <Badge variant="default" className=" absolute -top-3 -right-4 text-[12px] p-2">{numberOfCartItems}</Badge>
                </div>
              </Link>
            </Button>
            <Button asChild className={iconButtonClassName} size="icon" variant="ghost">
              <Link aria-label="profile" href="/profile">
                <UserRound className="h-[19px] w-[19px]" aria-hidden="true" />
              </Link>
            </Button>
              </>
            }

            <div className=" hidden lg:flex">
              {session.status === "loading" ? <Spinner/> : session.status === "authenticated" ? <>
            <Button onClick={signOutUser} variant="destructive">Logout</Button>
            </> : <div className="hidden lg:flex gap-1">
              <Link href={`/login`}><Button variant="default">Login</Button></Link>
            <Link href={`/register`}><Button variant="default">Register</Button></Link>
            </div>}
            </div>
            

            <Button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`lg:hidden ${iconButtonClassName}`}
              onClick={() => setMenuOpen((open) => !open)}
              size="icon"
              type="button"
              variant="ghost"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <div className="flex items-center rounded-full border border-slate-200 bg-white">
            <input
              aria-label="Search products"
              className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-[#21313C] outline-none placeholder:text-slate-400"
              placeholder="Search products..."
              type="search"
            />
            <Button
              aria-label="Search"
              className="mr-1 h-8 w-8 rounded-full bg-[#0AAD0A] p-0 text-white hover:bg-[#099909]"
              size="icon"
              type="button"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-slate-100 py-2 lg:hidden"
            id="mobile-navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                className="block rounded-lg px-3 py-3 text-sm font-medium text-[#21313C] transition-colors hover:bg-[#f0faf0] hover:text-[#0AAD0A]"
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session.status === "loading" ? <Spinner/> : session.status === "authenticated" ? <>
            <Button onClick={signOutUser} variant="destructive" className="w-full py-5">Logout</Button>
            </> : <div className="flex justify-center items-center gap-2">
              <Link className="w-full" href={`/login`}><Button variant="default" className="w-full py-5">Login</Button></Link>
            <Link className="w-full" href={`/register`}><Button variant="default" className="w-full py-5">Register</Button></Link>
            </div>}
            
          </nav>
        )}
      </div>
    </header>
  );
}
