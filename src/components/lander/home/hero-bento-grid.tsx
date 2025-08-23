"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { featuredProducts } from "@/utilities/Productdata";

export function HeroBentoGrid() {
  const activeProducts = featuredProducts.filter((p) => p.status !== 0);

  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {activeProducts.map((product, i) => (
        <BentoGridItem
          key={product.id}
          title={product.name}
          description={product.features[0] || ""}
          header={
            <div className="w-full h-[160px] relative overflow-hidden rounded-xl border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          }
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
