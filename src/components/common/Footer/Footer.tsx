import Image from "next/image";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, Headset, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import logo from "@/assets/logo.svg";

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", description: "14-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", description: "100% secure checkout" },
  { icon: Headset, title: "24/7 Support", description: "Contact us anytime" },
];

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: "/categories" },
    { label: "Men's Fashion", href: "/categories" },
    { label: "Women's Fashion", href: "/categories" },
  ],
  account: [
    { label: "My Account", href: "/profile" },
    { label: "Order History", href: "/allorders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/register" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Track Order", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0b1426] text-gray-400 mt-20">
      {/* Features Bar */}
      <div className="bg-[#f0faf0] text-[#21313C] py-4 sm:py-6 border-b border-slate-100">
        <div className="container mx-auto px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#dcfce7] p-2.5 sm:p-3 rounded-xl text-[#0AAD0A]">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-[#0f172a]">{feature.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Header and Links */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <Link href="/">
              <div className="inline-block bg-white p-1.5 sm:p-2 rounded-xl">
                <Image src={logo} alt="FreshCart" width={100} height={20} className="w-auto h-auto sm:w-[140px] sm:h-[28px]" />
              </div>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400 max-w-xs sm:max-w-sm">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <p className="flex items-center gap-2 sm:gap-3"><Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#0AAD0A]" /> <span className="hidden sm:inline">+1 (800) 123-4567</span><span className="sm:hidden">+1 800</span></p>
              <p className="flex items-center gap-2 sm:gap-3"><Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#0AAD0A]" /> support@freshcart.com</p>
              <p className="flex items-center gap-2 sm:gap-3"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#0AAD0A]" /> 123 Commerce St, NY</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-2.5 sm:gap-3 pt-1.5 sm:pt-2">
              <Link href="#" className="bg-slate-800/80 p-2 rounded-full hover:bg-[#0AAD0A] text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </Link>
              <Link href="#" className="bg-slate-800/80 p-2 rounded-full hover:bg-[#0AAD0A] text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
              </Link>
              <Link href="#" className="bg-slate-800/80 p-2 rounded-full hover:bg-[#0AAD0A] text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </Link>
              <Link href="#" className="bg-slate-800/80 p-2 rounded-full hover:bg-[#0AAD0A] text-gray-300 hover:text-white transition-colors" aria-label="Youtube">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <h3 className="text-white font-bold text-base mb-3">{/* Shop */}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors text-xs sm:text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-base mb-3">{/* Account */}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors text-xs sm:text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-base mb-3">{/* Support */}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors text-xs sm:text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-base mb-3">{/* Legal */}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors text-xs sm:text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#080f1d]">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
          <p className="text-center sm:text-left">&copy; 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Visa</span>
            <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Mastercard</span>
            <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}