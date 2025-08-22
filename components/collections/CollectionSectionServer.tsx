import { ICollection, IProduct, ICollectionProduct } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardBase } from "@/components/product/ProductCard";
import { Encoder } from "@/lib/Encoder";

interface CollectionSectionServerProps {
  collection: ICollection;
}

export default function CollectionSectionServer({ collection }: CollectionSectionServerProps) {
  const isCollectionProduct = (
    item: IProduct | ICollectionProduct
  ): item is ICollectionProduct => {
    return (item as ICollectionProduct).product !== undefined;
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{collection.name}</h2>
        <Link href={`/collections/${collection.slug}`}>
          <Button variant="outline" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collection.products?.slice(0, 8).map((item, index) => {
          const normalizedProduct: IProduct = isCollectionProduct(item)
            ? item.product
            : item;
          return (
            <ProductCardBase
              key={normalizedProduct.id}
              index={index}
              product={normalizedProduct}
            />
          );
        })}
      </div>
    </section>
  );
}