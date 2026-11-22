
import { getAllProduct } from "@/services/product.service";
import { GetAllCategories } from "@/services/categories.service";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductsGrid from "@/components/home/ProductsGrid";
import NewsletterSection from "@/components/home/NewsletterSection";
import { GetLoggedUserWishlist } from "@/actions/wishlist.actions";

export default async function Home() {
  const x = null;

  const productsRes = await getAllProduct(x);
  const categoriesRes = await GetAllCategories();
  const wishlistRes = await GetLoggedUserWishlist();

  const products = productsRes.data;
  const categories = categoriesRes.data;
  const wishlistIds = wishlistRes.data.map((item: any) => item._id);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection categories={categories} />
      <ProductsGrid products={products} wishlistIds={wishlistIds} />
      <NewsletterSection />
    </main>
  );
}
