"use client";

import SolarForm from "@/components/lander/Product/SolarPanelForm";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Gets the ID from the URL (e.g., `/products/123`)

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Solar Panel Form</h1>
      <SolarForm id={id} />
    </div>
  );
}
