export type IPurchase = {
  _id: string;
  userId: string;
  usesrId?: string;
  productId: string;
  fullName: string;
  consumerNumber: string;
  discom: string;
  kw: string;
  latitude: string;
  longitude: string;
  contactNumber: string;
  email: string;
  aadharNumber: string;
  variant: "Residential" | "Commercial" | string;
  files: Record<string, unknown>;
  filePreviews: {
    lightBill?: string;
    loadSection?: string;
    passportPhoto?: string;
    aadharPhoto?: string;
    taxBill?: string;
    [key: string]: string | undefined;
  };
  createdAt: string;
  updatedAt: string;
};
