"use client";

import { useState, useMemo } from "react";
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
    filePreviews: {
      lightBill: "",
      loadSection: "",
      passportPhoto: "",
      aadharPhoto: "",
      taxBill: "",
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
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        files: { ...prev.files, [field]: file },
        filePreviews: { ...prev.filePreviews, [field]: previewURL },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "files") {
        Object.entries(value).forEach(([fileKey, fileValue]) => {
          if (fileValue) {
            submitData.append(fileKey, fileValue as File);
          }
        });
      } else if (typeof value === "string") {
        submitData.append(key, value);
      }
    });

    toast.success("Form submitted successfully!");
    console.log("Form Data:", formData);
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
            <div className="flex items-center gap-3">
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
              {formData.filePreviews[
                fileField.key as keyof typeof formData.filePreviews
              ] && (
                <img
                  src={
                    formData.filePreviews[
                      fileField.key as keyof typeof formData.filePreviews
                    ]
                  }
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center h-10">
        <Button
          type="submit"
          className="flex justify-center items-center w-full sm:w-auto"
        >
          Submit & Proceed
        </Button>
      </div>
    </form>
  );
}
