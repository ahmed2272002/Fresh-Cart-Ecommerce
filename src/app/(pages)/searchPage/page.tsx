"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Heart,
  RotateCw,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllProduct } from "@/services/product.service";
import { productIF } from "@/types/product.type";
import WishListButton from "@/components/wishlist/WishListButton";
import Image from "next/image";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { GetLoggedUserWishlist } from "@/actions/wishlist.actions";
import { insitalState, WishListIF } from "@/types/wishlist.Type";
import Link from "next/link";

export default function SearchPage() {
  const [Products, setProducts] = useState<productIF[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<WishListIF[]>([]);
  const wishlistIds = wishlist.map((item) => item._id);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const toggleItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = Products.filter((p) => {
      const matchSearch =
        !term ||
        p.title?.toLowerCase().includes(term) ||
        p.category?.name?.toLowerCase().includes(term) ||
        p.brand?.name?.toLowerCase().includes(term);

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category?.name);

      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand?.name);

      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);

      return matchSearch && matchCategory && matchBrand && matchMin && matchMax;
    });

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;
    }

    return result;
  }, [
    Products,
    searchTerm,
    sortBy,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
  ]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getPageButtonClass = (page: number) => {
    return currentPage === page
      ? "bg-green-600 text-white"
      : "bg-white hover:bg-green-50 text-gray-700";
  };

  const fetchProducts = async (page: number) => {
    try {
      const response = await getAllProduct(page);
      setProducts(response.data);
      if (response.metadata) {
        setNumberOfPages(response.metadata.numberOfPages || 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function initialState() {
    try {
      const wishlistRes = await GetLoggedUserWishlist();
      setWishlist(wishlistRes?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchProducts(1);
    initialState();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 font-sans">
      {/* Breadcrumb & Search */}
      <div className="text-sm text-gray-500 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-black text-md font-bold opacity-80 hover:opacity-100"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black text-md font-bold">
                Search Results
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-8 relative max-w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="pl-12 h-14 rounded-full border-gray-200 shadow-sm text-base focus-visible:ring-green-500"
          />
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-72 shrink-0 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Categories</h3>
            <div className="space-y-3">
              {[
                "Music",
                "Men's Fashion",
                "Women's Fashion",
                "SuperMarket",
                "Baby & Toys",
                "Home",
                "Books",
                "Beauty & Health",
              ].map((cat) => (
                <div key={cat} className="flex items-center gap-3">
                  <Checkbox
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      toggleItem(selectedCategories, setSelectedCategories, cat)
                    }
                    className="rounded border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={cat}
                    className="text-gray-700 font-normal cursor-pointer"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Price Range
            </h3>
            <div className="flex gap-2 mb-3">
              <Input
                type="number"
                placeholder="Min (EGP)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-10 rounded-xl bg-gray-50 border-gray-200 text-sm"
              />
              <Input
                placeholder="Max (EGP)"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-10 rounded-xl bg-gray-50 border-gray-200 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("500");
                }}
                size="sm"
                className="rounded-xl border-gray-200 text-xs text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              >
                Under 500
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("1000");
                }}
                size="sm"
                className="rounded-xl border-gray-200 text-xs text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              >
                Under 1K
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("5000");
                }}
                size="sm"
                className="rounded-xl border-gray-200 text-xs text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              >
                Under 5K
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("10000");
                }}
                size="sm"
                className="rounded-xl border-gray-200 text-xs text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              >
                Under 10K
              </Button>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Brands</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {[
                "Canon",
                "Dell",
                "Lenovo",
                "SONY",
                "Infinix",
                "Realme",
                "HONOR",
                "Nokia",
              ].map((brand) => (
                <div key={brand} className="flex items-center gap-3">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      toggleItem(selectedBrands, setSelectedBrands, brand)
                    }
                    className="rounded border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={brand}
                    className="text-gray-700 font-normal cursor-pointer"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategories([]);
              setSelectedBrands([]);
              setMinPrice("");
              setMaxPrice("");
              setSearchTerm("");
            }}
            className="w-full rounded-xl"
          >
            Clear Filters
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsListView(false)}
                className={`h-10 w-10 rounded-xl border border-gray-300 bg-white text-black hover:bg-green-50 hover:border-green-500`}
              >
                <LayoutGrid className="size-5" />
              </Button>
              <Button
                onClick={() => setIsListView(true)}
                className={`h-10 w-10 rounded-xl border border-gray-300 bg-white text-black hover:bg-green-50 hover:border-green-500`}
              >
                <List className="size-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-800 outline-none focus:border-green-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid / List View Toggle */}
          {isListView ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-xs hover:shadow-md transition-shadow group w-full"
                >
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <WishListButton
                      ProductId={product._id}
                      initialIsWishlisted={wishlistIds.includes(product._id)}
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Image */}
                    <Link
                      href={`/products/${product._id}`}
                      className="relative w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
                    >
                      <Image
                        src={product.imageCover}
                        width={128}
                        height={128}
                        alt={product.title}
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {product.category.name}
                        </p>

                        <Link href={`/products/${product._id}`}>
                          <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug hover:text-green-600 transition-colors">
                            {product.title}
                          </h4>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3.5 ${i < Math.floor(product.ratingsAverage) ? "fill-amber-400" : "text-gray-300 fill-gray-100"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1 font-medium">
                            {product.ratingsQuantity}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({product.quantity})
                          </span>
                        </div>
                      </div>

                      {/* Price & Add Button (برا أي Link) */}
                      <div className="flex items-center justify-between pt-2 gap-2">
                        <span className="font-bold text-gray-900 text-base">
                          {product.price} EGP
                        </span>
                        <AddToCartButton productId={product._id} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="relative rounded-2xl border border-gray-100 bg-white p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
                >
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <WishListButton
                      ProductId={product._id}
                      initialIsWishlisted={wishlistIds.includes(product._id)}
                    />
                  </div>

                  {/* Image */}
                  <Link href={`/products/${product._id}`}>
                    <div className="relative w-full h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                      <Image
                        src={product.imageCover}
                        width={200}
                        height={2100}
                        alt={product.title}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          {product.category.name}
                        </p>
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-snug">
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </h4>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3.5 ${i < Math.floor(product.ratingsAverage) ? "fill-amber-400" : "text-gray-300 fill-gray-100"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1 font-medium">
                            {product.ratingsQuantity}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({product.quantity})
                          </span>
                        </div>
                      </div>

                      {/* Price & Add Button */}
                      <div className="flex flex-col items-center justify-between pt-2 gap-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-gray-900 text-base">
                              {product.price} EGP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <AddToCartButton productId={product._id} />
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No products found.
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="icon"
              className="rounded-xl border-gray-200 text-gray-500 h-10 w-10"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-xl h-10 w-10 font-bold ${getPageButtonClass(page)}`}
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))
              }
              disabled={currentPage === numberOfPages}
              variant="outline"
              size="icon"
              className="rounded-xl border-gray-200 text-gray-500 h-10 w-10"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
