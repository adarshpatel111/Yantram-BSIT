"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { featuredProducts } from "@/utilities/Productdata";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "@/lib/auth-client";

export default function Products() {
  const router = useRouter();
  const sessionData = useSession();
  const queryClient = useQueryClient();
  const dummyBranches = ["Bharuch", "Vadodara", "Surat", "Ahmedabad"];

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showVariationForm, setShowVariationForm] = useState(false);
  const [variantPrice, setVariantPrice] = useState<number | null>(null);
  const [selectedVariantLabel, setSelectedVariantLabel] = useState<
    string | null
  >(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const userId = sessionData.data?.user.id;

  const { data: purchasedProducts = [] } = useQuery({
    queryKey: ["purchasedProducts", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/purchases?userId=${userId}`);
      return res.data
        .filter((purchase: any) => purchase.userId === userId)
        .map((purchase: any) => purchase.productId);
    },
    enabled: !!userId,
  });

  const purchaseMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axios.post("/api/purchases", {
        userId,
        productId,
        selectedVariant,
        name: selectedProduct?.name,
        model: selectedProduct?.model,
        branch: selectedBranch,
      });
      return res.data;
    },
    onSuccess: (_, productId) => {
      queryClient.setQueryData<string[]>(
        ["purchasedProducts", userId],
        (old = []) => [...old, productId]
      );
    },
  });

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  const handlePurchase = (product: any) => {
    if (product.id === "solar-panel") {
      router.push(`/dashboard/products/${product.id}`);
      return;
    }

    if (product.variants && product.variants.length > 0) {
      setSelectedProduct(product);
      setShowVariationForm(true);

      const firstVariant = product.variants[0];
      const firstLabel = Object.entries(firstVariant)
        .filter(([key]) => key !== "price")
        .map(([_, val]) => `${val}`)
        .join(" - ");

      setSelectedVariant(firstVariant);
      setSelectedVariantLabel(firstLabel);
      setVariantPrice(firstVariant.price);

      setSelectedBranch(null);

      return;
    }

    setSelectedProduct(product);
    purchaseMutation.mutate(product.id);
  };

  const handleVariationSubmit = (selectedLabel: string) => {
    if (!selectedProduct?.variants || !selectedVariant || !selectedBranch)
      return;
    purchaseMutation.mutate(selectedProduct.id);
    setShowVariationForm(false);
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
          {featuredProducts
            .filter((product) => product.status === 1)
            .map((product) => {
              const isPurchased = purchasedProducts.includes(product.id);
              return (
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-1 mb-4">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => handlePurchase(product)}
                      disabled={
                        isPurchased || purchaseMutation.status === "pending"
                      }
                    >
                      {isPurchased
                        ? "Purchased"
                        : purchaseMutation.status === "pending"
                        ? "Processing..."
                        : "Purchase"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      <Dialog open={showVariationForm} onOpenChange={setShowVariationForm}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              Select Variations for {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription>
              Please choose a branch and variant before proceeding to purchase.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct?.variants?.length > 0 && (
            <div className="space-y-4">
              <div className="flex gap-5 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium">Select Branch</label>
                  <Select
                    value={selectedBranch ?? undefined}
                    onValueChange={(branch) => setSelectedBranch(branch)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyBranches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium">Select Variant</label>
                  <Select
                    value={selectedVariantLabel ?? undefined}
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
                      if (found) {
                        setVariantPrice(found.price);
                        setSelectedVariant(found);
                      }
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
              </div>

              <div className="text-lg font-bold text-primary">
                Price:{" "}
                {formatPrice(variantPrice ?? selectedProduct.variants[0].price)}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() =>
                  selectedVariantLabel &&
                  selectedBranch &&
                  handleVariationSubmit(selectedVariantLabel)
                }
                disabled={
                  !selectedVariantLabel ||
                  !selectedBranch ||
                  purchaseMutation.status === "pending"
                }
              >
                {purchaseMutation.status === "pending"
                  ? "Processing..."
                  : "Submit & Proceed"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
