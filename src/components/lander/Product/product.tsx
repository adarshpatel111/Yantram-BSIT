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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { featuredProducts } from "@/utilities/Productdata";

export default function Products() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showVariationForm, setShowVariationForm] = useState(false);

  // Variation form fields
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [installationType, setInstallationType] = useState("");

  const handlePurchase = (product: any) => {
    // If it's a solar product and has variations
    if (product.name.toLowerCase().includes("solar") && product.variations) {
      setSelectedProduct(product);
      setShowVariationForm(true);
      return;
    }

    // Otherwise proceed directly
    proceedToLogin(product);
  };

  const proceedToLogin = (product: any, variations: any = null) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      model: product.model,
      specs: product.specs,
      features: product.features,
      variations,
    };

    console.log("Purchase data:", JSON.stringify(productData, null, 2));
    router.push("/login");
  };

  const handleVariationSubmit = () => {
    if (!selectedCapacity || !installationType) return;

    const variations = {
      capacity: selectedCapacity,
      installationType,
    };

    proceedToLogin(selectedProduct, variations);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover our most popular and innovative products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group border hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.image || "/file.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <CardHeader className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      Model: {product.model}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {product.price}
                    </div>
                    <div className="text-sm line-through text-muted-foreground">
                      {product.originalPrice}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-sm text-gray-700">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {product.features
                      .slice(0, 3)
                      .map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  {Object.entries(product.specs)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 p-2 rounded border text-xs"
                      >
                        <div className="font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </div>
                        <div className="text-muted-foreground">{value}</div>
                      </div>
                    ))}
                </div>

                <Button
                  className="w-full"
                  onClick={() => handlePurchase(product)}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🔽 Variation Form Modal */}
      <Dialog open={showVariationForm} onOpenChange={setShowVariationForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Select Variations for {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Capacity</label>
              <Select onValueChange={setSelectedCapacity}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3kW">3kW</SelectItem>
                  <SelectItem value="5kW">5kW</SelectItem>
                  <SelectItem value="10kW">10kW</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Installation Type</label>
              <Select onValueChange={setInstallationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rooftop">Rooftop</SelectItem>
                  <SelectItem value="ground-mounted">Ground Mounted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4" onClick={handleVariationSubmit}>
              Submit & Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
