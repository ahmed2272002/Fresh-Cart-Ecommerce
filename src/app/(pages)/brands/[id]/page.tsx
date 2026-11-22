"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetSpecificBrand } from "@/services/brand.service";
import { BrandIF } from "@/types/brand.type";
import { getAllProduct } from "@/services/product.service";
import { productIF } from "@/types/product.type";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star } from "lucide-react";

// Fallback data for when API is not available
const FALLBACK_BRAND: BrandIF = {
  _id: "64089f1c24b25627a25315c3",
  name: "Infinix",
  slug: "infinix",
  image: "https://ecommerce.routemisr.com/Route-Academy-brands/1678286620402.png",
  createdAt: "2023-03-08T14:43:40.601Z",
  updatedAt: "2023-03-08T14:43:40.601Z",
};

const FALLBACK_PRODUCTS: productIF[] = [
  {
    sold: 150,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883440509.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883448157.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883455979.png",
    ],
    subcategory: [{ _id: "64089f1c24b25627a25315c3", name: "Phones", slug: "phones", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 45,
    _id: "1",
    title: "Infinix Note 30 Pro 5G",
    slug: "infinix-note-30-pro-5g",
    description: "A powerful smartphone with sleek design and fast performance",
    quantity: 25,
    price: 1299,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883463551.png",
    category: { _id: "cat1", name: "Electronics", slug: "electronics", image: "", createdAt: "", updatedAt: "", __v: 0 },
    brand: FALLBACK_BRAND,
    ratingsAverage: 4.3,
    createdAt: "2023-03-08T14:43:40.601Z",
    updatedAt: "2023-03-08T14:43:40.601Z",
    id: "1",
  },
  {
    sold: 89,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883471234.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883478567.png",
    ],
    subcategory: [{ _id: "64089f1c24b25627a25315c3", name: "Tablets", slug: "tablets", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 32,
    _id: "2",
    title: "Infinix Tab X1 10.4\"",
    slug: "infinix-tab-x1",
    description: "A versatile tablet for work and entertainment",
    quantity: 18,
    price: 1599,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883485890.png",
    category: { _id: "cat1", name: "Electronics", slug: "electronics", image: "", createdAt: "", updatedAt: "", __v: 0 },
    brand: FALLBACK_BRAND,
    ratingsAverage: 4.1,
    createdAt: "2023-03-08T14:43:40.601Z",
    updatedAt: "2023-03-08T14:43:40.601Z",
    id: "2",
  },
  {
    sold: 210,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883493210.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883500543.png",
    ],
    subcategory: [{ _id: "64089f1c24b25627a25315c3", name: "Laptops", slug: "laptops", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 68,
    _id: "3",
    title: "Infinix laptops 14\"",
    slug: "infinix-laptop-14",
    description: "Lightweight laptop for productive work",
    quantity: 12,
    price: 2499,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883507876.png",
    category: { _id: "cat1", name: "Electronics", slug: "electronics", image: "", createdAt: "", updatedAt: "", __v: 0 },
    brand: FALLBACK_BRAND,
    ratingsAverage: 4.6,
    createdAt: "2023-03-08T14:43:40.601Z",
    updatedAt: "2023-03-08T14:43:40.601Z",
    id: "3",
  },
];

export default function BrandDetails() {
  const { id } = useParams() as { id: string };

  const [brand, setBrand] = useState<BrandIF | null>(null);
  const [brandProducts, setBrandProducts] = useState<productIF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrandDetails() {
      try {
        setLoading(true);

        // Try to fetch brand from API
        let brandData: BrandIF | null = null;
        try {
          const brandResponse = await GetSpecificBrand(id);
          brandData = brandResponse.data;
        } catch {
          // Use fallback data if brand ID matches
          brandData = FALLBACK_BRAND._id === id ? FALLBACK_BRAND : null;
        }

        // Try to fetch products from API
        let products: productIF[] = [];
        try {
          const productsResponse = await getAllProduct(null);
          const allProducts: productIF[] = productsResponse.data;
          products = allProducts.filter((product) => product.brand._id === id);
        } catch {
          // Use fallback products if brand ID matches
          if (FALLBACK_BRAND._id === id) {
            products = FALLBACK_PRODUCTS;
          }
        }

        setBrand(brandData);
        setBrandProducts(products);
      } catch (err) {
        setError("Failed to fetch brand details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBrandDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[400px] justify-center items-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-muted-foreground">{error || "Brand not found"}</p>
        <Link href="/brands">
          <Button className="mt-4">Back to Brands</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <div className="breadcrumb my-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/brands">Brands</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">{brand.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Brand Header Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Brand Image */}
          <div className="lg:col-span-3">
            <Card className="p-4 flex justify-center items-center bg-white">
              <Image
                src={brand.image}
                alt={brand.name}
                width={300}
                height={300}
                className="object-contain max-w-full h-auto"
                priority
              />
            </Card>
          </div>

          {/* Brand Info */}
          <div className="lg:col-span-9 space-y-4">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {brand.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-amber-400" />
                <span>4.5</span>
              </span>
              <span>•</span>
              <span>Trusted Brand</span>
            </div>

            <p className="text-muted-foreground max-w-prose">
              {brand.name} is a leading brand in the electronics industry, known
              for providing high-quality, innovative, and affordable products.
              With a strong reputation for durability and customer satisfaction,
              {brand.name} offers a wide range of products that cater to modern
              lifestyle needs.
            </p>

            <Link href={`/products`}>
              <Button className="bg-green-600 hover:bg-green-700">
                Shop {brand.name} Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold">
            {brandProducts.length} Products from {brand.name}
          </h2>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {brandProducts.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <Card className="p-3 flex flex-col justify-between h-full transition-all hover:shadow-md">
                  <div>
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category.name}
                    </p>
                    <h3 className="text-sm font-medium line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-current text-amber-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{product.price} EGP</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found from {brand.name} yet
            </p>
            <Link href="/products">
              <Button className="mt-4">Browse All Products</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}