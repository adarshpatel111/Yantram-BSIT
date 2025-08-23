export type IPurchase = {
  _id: string;
  userId: string;
  usesrId?: string;
  productId: string;
  name: string;
  consumerNumber: string;
  discom: string;
  kw: string;
  latitude: string;
  longitude: string;
  contactNumber: string;
  email: string;
  aadharNumber: string;
  variant: "Residential" | "Commercial" | string;
  capacity: string;
  productStatus: string;
  selectedVariant?: { [key: string]: any };
  files: Record<string, unknown>;
  filePreviews: {
    lightBill?: string;
    loadSection?: string;
    passportPhoto?: string;
    aadharPhoto?: string;
    taxBill?: string;
    [key: string]: string | undefined;
  };
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
};
