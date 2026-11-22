import Link from "next/link";
import Image from "next/image";
import { CategoryIF } from "@/types/category.type";
import { ArrowRight } from "lucide-react";

export default function CategoriesSection({ categories }: { categories: CategoryIF[] }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold ps-3 relative before:absolute before:h-full before:w-1 before:rounded-xl before:top-0 before:left-0 before:bg-gradient-to-b before:from-green-500 before:to-green-900">Shop By <span className="text-green-700">Category</span></h2>
        <Link href="/categories" className="text-sm text-green-600 flex items-center gap-1 hover:underline">
          View All Categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.slice(0, 10).map((cat) => (
          <Link key={cat._id} href={`/categories/${cat._id}`} className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image src={cat.image} alt={cat.name} width={80} height={80} className="object-cover" />
            </div>
            <p className="mt-2 text-sm font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="relative h-48 rounded-xl overflow-hidden bg-green-600 text-white flex items-center p-6">
          <div>
            <p className="text-xs uppercase">New Arrival</p>
            <h3 className="text-xl font-bold">Fresh Organic Fruits</h3>
            <p className="text-sm opacity-90">Get the finest organic fruits</p>
            <p className="text-lg font-bold mt-1">40% OFF</p>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:underline">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative h-48 rounded-xl overflow-hidden bg-[linear-gradient(90deg,#ff8a00,#e52e71)] text-white flex items-center p-6">
          <div>
            <p className="text-xs uppercase">New Arrival</p>
            <h3 className="text-xl font-bold">Exotic Vegetables</h3>
            <p className="text-sm opacity-90">Explore premium vegetables</p>
            <p className="text-lg font-bold mt-1">25% OFF</p>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold mt-2 hover:underline">
              Explore Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
