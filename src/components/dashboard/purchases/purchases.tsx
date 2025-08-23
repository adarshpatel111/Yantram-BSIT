"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { featuredProducts } from "@/utilities/Productdata";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Purchased from "@/components/dashboard/purchases/purchased";
import { Branches } from "../branches";
import { toast } from "sonner";

const purchaseSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  productId: z.string().min(1, "Product is required"),
  variantIndex: z.string().optional(),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

const Purchases = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { handleSubmit, setValue, watch, reset, formState } =
    useForm<PurchaseFormValues>({
      resolver: zodResolver(purchaseSchema),
      defaultValues: { branch: "", productId: "", variantIndex: "" },
    });

  const watchedProductId = watch("productId");
  const watchedVariantIndex = watch("variantIndex");

  const selectedProduct = featuredProducts.find(
    (p) => p.id === watchedProductId
  );

  useEffect(() => {
    if (selectedProduct?.variants?.length) {
      setValue("variantIndex", "0");
    } else {
      setValue("variantIndex", "");
    }
  }, [selectedProduct, setValue]);

  const selectedVariant =
    selectedProduct?.variants?.[parseInt(watchedVariantIndex || "0")] ||
    selectedProduct?.variants?.[0];

  const purchaseMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: () => {
      reset();
      setOpen(false);
      toast.success("Purchase saved successfully!", {
        description: "Your purchase has been recorded.",
      });
    },
    onError: (error: any) => {
      toast.error("Purchase failed!", {
        description: error.message || "Please try again later.",
      });
    },
  });

  const onSubmit = (data: PurchaseFormValues) => {
    if (!selectedProduct) return;

    if (selectedProduct.id === "solar-panel") {
      router.push("/dashboard/products/solar-panel");
      setOpen(false);
      return;
    }

    const payload = {
      ...data,
      name: selectedProduct.name,
      model: selectedProduct.model,
      badge: selectedProduct.badge,
      features: selectedProduct.features,
      specs: selectedProduct.specs,
      selectedVariant: selectedVariant,
    };

    purchaseMutation.mutate(payload);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>+ New Purchase</Button>
      <Purchased />
      <>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) reset();
            setOpen(isOpen);
          }}
        >
          <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Purchase</DialogTitle>
            </DialogHeader>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className="font-medium mb-1">Branch</p>
                <Select
                  value={watch("branch")}
                  onValueChange={(val) => setValue("branch", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {Branches.map((branch) => (
                      <SelectItem key={branch.key} value={branch.label}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formState.errors.branch && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.branch.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="font-medium mb-1">Product</p>
                  <Select
                    value={watchedProductId || ""}
                    onValueChange={(val) => setValue("productId", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {featuredProducts
                        .filter((product) => product.status === 1)
                        .map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProduct?.variants &&
                  selectedProduct.id !== "solar-panel" && (
                    <div className="flex-1">
                      <p className="font-medium mb-1">Variant</p>
                      <Select
                        value={watchedVariantIndex || "0"}
                        onValueChange={(val) => setValue("variantIndex", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedProduct.variants.map((variant, idx) => {
                            const label =
                              Object.entries(variant)
                                .filter(([key]) => key !== "price")
                                .map(([_, value]) => value)
                                .join(" – ") || `Variant ${idx + 1}`;

                            return (
                              <SelectItem key={idx} value={idx.toString()}>
                                {`${label} – ₹${variant.price}`}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
              </div>

              {selectedProduct && selectedVariant && (
                <div className="border rounded-md bg-gray-50 p-4 space-y-4 shadow-sm">
                  <p className="font-bold text-xl">{selectedProduct.name}</p>
                  {selectedProduct.image?.src && (
                    <img
                      src={selectedProduct.image.src}
                      alt={selectedProduct.name}
                      className="w-full h-auto object-contain"
                    />
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Model:</span>
                    <span>{selectedProduct.model}</span>

                    <span className="font-medium">Badge:</span>
                    <span>{selectedProduct.badge}</span>

                    <span className="font-medium">Features:</span>
                    <span>{selectedProduct.features.join(", ")}</span>

                    {selectedProduct.id !== "solar-panel" && (
                      <>
                        <span className="font-medium">Variant:</span>
                        <span>
                          {Object.entries(selectedVariant)
                            .filter(([key]) => key !== "price")
                            .map(([_, value]) => value)
                            .join(" – ")}
                        </span>

                        <span className="font-medium">Price:</span>
                        <span className="font-semibold">
                          ₹{selectedVariant.price}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={
                    selectedProduct?.id !== "solar-panel" &&
                    purchaseMutation.status === "pending"
                  }
                >
                  {selectedProduct?.id === "solar-panel"
                    ? "Next Step"
                    : purchaseMutation.status === "pending"
                    ? "Purchasing..."
                    : "Purchase"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default Purchases;
