import { ICategory } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardBase } from "@/components/product/ProductCard";

interface CategorySectionServerProps {
  category: ICategory;
}

export default function CategorySectionServer({ category }: CategorySectionServerProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
        <Link href={`/shop/${category.slug}`}>
          <Button variant="outline" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.products?.slice(0, 8).map((product, index) => (
          <ProductCardBase
            key={product.id}
            index={index}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
