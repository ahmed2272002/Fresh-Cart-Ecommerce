"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetSpecificCategory } from "@/services/categories.service";
import { CategoryIF } from "@/types/category.type";
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
const FALLBACK_CATEGORY: CategoryIF = {
  _id: "6439d5b90049ad0b52b90048",
  name: "Men's Fashion",
  slug: "men-s-fashion",
  image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
  createdAt: "2023-04-14T22:37:45.627Z",
  updatedAt: "2023-04-14T22:37:45.627Z",
};

const FALLBACK_PRODUCTS: productIF[] = [
  {
    sold: 89,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883440509.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883448157.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883455979.png",
    ],
    subcategory: [{ _id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", slug: "mens-fashion", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 42,
    _id: "cat-prod-1",
    title: "Men's Slim Fit Jeans",
    slug: "mens-slim-fit-jeans",
    description: "Premium cotton blend jeans with a modern slim fit for a tailored look",
    quantity: 35,
    price: 899,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883463551.png",
    category: FALLBACK_CATEGORY,
    brand: { _id: "brand1", name: "Levi's", slug: "levis", image: "", createdAt: "", updatedAt: "", __v: 0 },
    ratingsAverage: 4.4,
    createdAt: "2023-04-14T22:37:45.627Z",
    updatedAt: "2023-04-14T22:37:45.627Z",
    id: "cat-prod-1",
  },
  {
    sold: 156,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883471234.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883478567.png",
    ],
    subcategory: [{ _id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", slug: "mens-fashion", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 67,
    _id: "cat-prod-2",
    title: "Classic Cotton Shirt",
    slug: "classic-cotton-shirt",
    description: "Breathable 100% cotton shirt with a classic fit and relaxed collar",
    quantity: 28,
    price: 750,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883485890.png",
    category: FALLBACK_CATEGORY,
    brand: { _id: "brand2", name: "Uniqlo", slug: "uniqlo", image: "", createdAt: "", updatedAt: "", __v: 0 },
    ratingsAverage: 4.7,
    createdAt: "2023-04-14T22:37:45.627Z",
    updatedAt: "2023-04-14T22:37:45.627Z",
    id: "cat-prod-2",
  },
  {
    sold: 203,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883493210.png",
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883500543.png",
    ],
    subcategory: [{ _id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", slug: "mens-fashion", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 89,
    _id: "cat-prod-3",
    title: "Leather Derby Shoes",
    slug: "leather-derby-shoes",
    description: "Handcrafted genuine leather derby shoes with premium comfort sole",
    quantity: 18,
    price: 1899,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883507876.png",
    category: FALLBACK_CATEGORY,
    brand: { _id: "brand3", name: "Clarks", slug: "clarks", image: "", createdAt: "", updatedAt: "", __v: 0 },
    ratingsAverage: 4.8,
    createdAt: "2023-04-14T22:37:45.627Z",
    updatedAt: "2023-04-14T22:37:45.627Z",
    id: "cat-prod-3",
  },
  {
    sold: 67,
    images: [
      "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883515123.png",
    ],
    subcategory: [{ _id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", slug: "mens-fashion", image: "", createdAt: "", updatedAt: "", __v: 0 }],
    ratingsQuantity: 38,
    _id: "cat-prod-4",
    title: "Wool Cashmere Scarf",
    slug: "wool-cashmere-scarf",
    description: "Luxury cashmere scarf with intricate knit pattern for winter warmth",
    quantity: 22,
    price: 699,
    imageCover: "https://ecommerce.routemisr.com/Route-Academy-productssubcategory/images/1680883522456.png",
    category: FALLBACK_CATEGORY,
    brand: { _id: "brand4", name: "John Smedley", slug: "john-smedley", image: "", createdAt: "", updatedAt: "", __v: 0 },
    ratingsAverage: 4.6,
    createdAt: "2023-04-14T22:37:45.627Z",
    updatedAt: "2023-04-14T22:37:45.627Z",
    id: "cat-prod-4",
  },
];

export default function CategoryDetails() {
  const { id } = useParams() as { id: string };

  const [category, setCategory] = useState<CategoryIF | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<productIF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryDetails() {
      try {
        setLoading(true);

        // Try to fetch category from API
        let categoryData: CategoryIF | null = null;
        try {
          const categoryResponse = await GetSpecificCategory(id);
          categoryData = categoryResponse.data;
        } catch {
          // Use fallback data if category ID matches
          categoryData = FALLBACK_CATEGORY._id === id ? FALLBACK_CATEGORY : null;
        }

        // Try to fetch products from API
        let products: productIF[] = [];
        try {
          const productsResponse = await getAllProduct(null);
          const allProducts: productIF[] = productsResponse.data;
          products = allProducts.filter((product) => product.category._id === id);
        } catch {
          // Use fallback products if category ID matches
          if (FALLBACK_CATEGORY._id === id) {
            products = FALLBACK_PRODUCTS;
          }
        }

        setCategory(categoryData);
        setCategoryProducts(products);
      } catch (err) {
        setError("Failed to fetch category details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[400px] justify-center items-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-muted-foreground">{error || "Category not found"}</p>
        <Link href="/categories">
          <Button className="mt-4">Back to Categories</Button>
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
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Category Header Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Category Image */}
          <div className="lg:col-span-3">
            <Card className="p-4 flex justify-center items-center bg-white overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
                className="object-cover w-full h-auto max-h-96 rounded-lg"
                priority
              />
            </Card>
          </div>

          {/* Category Info */}
          <div className="lg:col-span-9 space-y-4">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {category.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-amber-400" />
                <span>4.5</span>
              </span>
              <span>•</span>
              <span>Popular Category</span>
            </div>

            <p className="text-muted-foreground max-w-prose">
              Explore our extensive collection of {category.name} products. From
              premium quality items to the latest trends, we offer you a curated
              selection designed to meet your needs. Discover quality, style, and
              value all in one place.
            </p>

            <Link href={`/products`}>
              <Button className="bg-green-600 hover:bg-green-700">
                Shop {category.name} Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold">
            {categoryProducts.length} Products in {category.name}
          </h2>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product) => (
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
                      {product.brand.name}
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
              No products found in {category.name} yet
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