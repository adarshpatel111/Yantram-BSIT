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
  DialogDescription,
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
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { featuredProducts } from "@/utilities/Productdata";
import { toast } from "sonner";
import { Branches } from "@/components/dashboard/branches";

export default function Products() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showVariationForm, setShowVariationForm] = useState(false);
  const [variantPrice, setVariantPrice] = useState<number | null>(null);
  const [selectedVariantLabel, setSelectedVariantLabel] = useState<
    string | null
  >(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  const handlePurchase = (product: any) => {
    if (product.id === "solar-panel") {
      router.push(`/products/${product.id}`);
      return;
    }
    if (product.variants && product.variants.length > 0) {
      setSelectedProduct(product);
      setShowVariationForm(true);
      setVariantPrice(null);
      setSelectedVariantLabel(null);
      setSelectedBranch(null);
      return;
    }
    proceedToLogin(product);
  };

  const proceedToLogin = (product: any, variation: any = null) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: variation?.price || product.basePrice,
      model: product.model,
      specs: product.specs,
      features: product.features,
      variation,
      branch: selectedBranch, // Include selected branch
    };
    console.log("Purchase data:", JSON.stringify(productData, null, 2));
    router.push("/login");
  };

  const handleVariationSubmit = (selectedLabel: string) => {
    if (!selectedProduct?.variants) return;

    const found = selectedProduct.variants.find((variant: any) => {
      const label = Object.entries(variant)
        .filter(([key]) => key !== "price")
        .map(([_, val]) => `${val}`)
        .join(" - ");
      return label === selectedLabel;
    });

    if (found) {
      proceedToLogin(selectedProduct, found);
    } else {
      toast.error("Please select a valid variant before proceeding.");
    }
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
          {featuredProducts.map(
            (product) =>
              product.status === 1 && (
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
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() =>
                        setPreviewImage(product.image?.src || "/file.svg")
                      }
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
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Model: {product.model}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(product.variants[0].price)}
                        </div>
                        {product.variants[0].price && (
                          <div className="text-sm line-through text-muted-foreground">
                            {formatPrice(
                              product.variants[0].price +
                                product.variants[0].price * 0.2
                            )}
                          </div>
                        )}
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
                            <div className="text-muted-foreground">
                              {typeof value === "object"
                                ? Object.entries(value)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ")
                                : value}
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      {Object.entries(
                        (product.variants || []).reduce(
                          (acc: Record<string, string[]>, v: any) => {
                            Object.entries(v).forEach(([key, val]) => {
                              if (key.toLowerCase() === "price") return;
                              const str = String(val);
                              if (!acc[key]) acc[key] = [];
                              if (!acc[key].includes(str)) acc[key].push(str);
                            });
                            return acc;
                          },
                          {}
                        )
                      )
                        .slice(0, 4)
                        .map(([key, values]) => (
                          <div
                            key={key}
                            className="bg-gray-50 p-2 rounded border text-xs"
                          >
                            <div className="font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                            <div className="text-muted-foreground">
                              {(values as string[]).join(", ")}
                            </div>
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
              )
          )}
        </div>
      </div>
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="p-0 max-w-4xl w-full">
          <Image
            src={previewImage || ""}
            alt="Preview"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showVariationForm} onOpenChange={setShowVariationForm}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              Select Variations for {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription>
              Please choose a variant and branch before proceeding.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct?.variants && selectedProduct.variants.length > 0 ? (
            <div className="space-y-4">
              <div className="flex gap-5 items-center">
                {/* Variant Selection */}
                <div>
                  <label className="text-sm font-medium">Select Variant</label>
                  <Select
                    onValueChange={(label) => {
                      setSelectedVariantLabel(label);
                      const found = selectedProduct.variants.find(
                        (variant: any) => {
                          const variantLabel = Object.entries(variant)
                            .filter(([key]) => key !== "price")
                            .map(([_, val]) => `${val}`)
                            .join(" - ");
                          return variantLabel === label;
                        }
                      );
                      setVariantPrice(found ? found.price : null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProduct.variants.map(
                        (variant: any, idx: number) => {
                          const label = Object.entries(variant)
                            .filter(([key]) => key !== "price")
                            .map(([_, val]) => `${val}`)
                            .join(" - ");
                          return (
                            <SelectItem key={idx} value={label}>
                              {label}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="text-sm font-medium">
                    Locate Your Store
                  </label>
                  <Select
                    onValueChange={(branchKey) => setSelectedBranch(branchKey)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {Branches.map((branch) => (
                        <SelectItem key={branch.key} value={branch.key}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Display */}
                <div className="h-2">
                  {variantPrice && (
                    <div className="text-lg font-bold text-primary">
                      Price: {formatPrice(variantPrice)}
                    </div>
                  )}
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => {
                  if (selectedVariantLabel && selectedBranch) {
                    handleVariationSubmit(selectedVariantLabel);
                  } else {
                    toast.error(
                      "Please select both variant and branch before proceeding."
                    );
                  }
                }}
                disabled={!selectedVariantLabel || !selectedBranch}
              >
                Submit & Proceed
              </Button>
            </div>
          ) : (
            <div>No variations available.</div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
