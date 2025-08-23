"use client";

import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { featuredProducts } from "@/utilities/Productdata";
import { toast } from "sonner";

export default function SolarForm({ id }: { id: string }) {
  const product = useMemo(
    () => featuredProducts.find((p) => p.id === id),
    [id]
  );

  const [formData, setFormData] = useState({
    fullName: "",
    consumerNumber: "",
    discom: "",
    kw: "",
    latitude: "",
    longitude: "",
    contactNumber: "",
    email: "",
    aadharNumber: "",
    variant: product?.variants?.length
      ? (product.variants[0] as { placetype: string }).placetype
      : "",
    files: {
      lightBill: null as File | null,
      loadSection: null as File | null,
      passportPhoto: null as File | null,
      aadharPhoto: null as File | null,
      taxBill: null as File | null,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const res = await fetch("/api/purchases", {
        method: "POST",
        body: payload,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }
      return res.json();
    },
    onMutate: () => {
      const id = toast.loading("Submitting your request...");
      return { toastId: id };
    },
    onSuccess: (data, _, context) => {
      console.log("✅ Submitted successfully:", data);
      toast.success("Form submitted successfully!", {
        id: context?.toastId,
        description: "Your solar purchase request has been saved.",
      });
    },
    onError: (error: any, _, context) => {
      console.error("❌ Error submitting:", error.message);
      toast.error("Submission failed!", {
        id: context?.toastId,
        description: error.message || "Please try again later.",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVariantChange = (value: string) => {
    setFormData((prev) => ({ ...prev, variant: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData.files
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      files: { ...prev.files, [field]: file },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("productId", id);
    submitData.append("fullName", formData.fullName);
    submitData.append("consumerNumber", formData.consumerNumber);
    submitData.append("discom", formData.discom);
    submitData.append("kw", formData.kw);
    submitData.append("latitude", formData.latitude);
    submitData.append("longitude", formData.longitude);
    submitData.append("contactNumber", formData.contactNumber);
    submitData.append("email", formData.email);
    submitData.append("aadharNumber", formData.aadharNumber);
    submitData.append("variant", formData.variant);

    Object.entries(formData.files).forEach(([key, file]) => {
      if (file) submitData.append(key, file);
    });

    mutation.mutate(submitData);
  };

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-2xl font-bold">{product.name}</h2>

      {product.variants?.length > 0 && (
        <div>
          <label className="block font-medium mb-1">Select Variant</label>
          <Select value={formData.variant} onValueChange={handleVariantChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a variant" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((v: any, idx: number) => (
                <SelectItem key={idx} value={v.placetype}>
                  {v.placetype} — {v.kw}kW — ₹{v.price.toLocaleString("en-IN")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "fullName", placeholder: "Full Name" },
          { name: "consumerNumber", placeholder: "Consumer Number" },
          { name: "discom", placeholder: "Discom" },
          { name: "kw", placeholder: "KW (Kilowatt)" },
          { name: "latitude", placeholder: "Latitude" },
          { name: "longitude", placeholder: "Longitude" },
          { name: "aadharNumber", placeholder: "Aadhar Number" },
          { name: "contactNumber", placeholder: "Contact Number" },
          { name: "email", placeholder: "Email", type: "email" },
        ].map((field) => (
          <Input
            key={field.name}
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            onChange={handleChange}
            required
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "lightBill", label: "Upload Latest Light Bill" },
          { key: "loadSection", label: "Upload Load Sanction Document" },
          { key: "passportPhoto", label: "Upload Passport Size Photo" },
          { key: "aadharPhoto", label: "Upload Aadhaar Card Photo" },
          { key: "taxBill", label: "Upload Property Tax Bill" },
        ].map((fileField) => (
          <div
            key={fileField.key}
            className="flex flex-col space-y-2 border-2 rounded-2xl p-2"
          >
            <label className="text-sm font-medium">{fileField.label}</label>
            <Input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileField.key as keyof typeof formData.files
                )
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center h-10">
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="flex justify-center items-center w-full sm:w-auto"
        >
          {mutation.isPending ? "Submitting..." : "Submit & Proceed"}
        </Button>
      </div>
    </form>
  );
}
