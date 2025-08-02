"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { featuredProducts } from "@/components/Product/data";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600">
            Discover our most popular and innovative products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={product.image || "/file.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                  {product.badge}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      Model: {product.model}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {product.price}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  {Object.entries(product.specs)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-2 rounded">
                        <div className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </div>
                        <div className="text-gray-600">{value}</div>
                      </div>
                    ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
