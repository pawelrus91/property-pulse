export type PropertyType =
  | "All"
  | "Apartment"
  | "Studio"
  | "Condo"
  | "House"
  | "Cabin Or Cottage"
  | "Loft"
  | "Room"
  | "Other";

export type Property = {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description?: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images?: string[];
  is_featured?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Location = {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

export type Rates = {
  weekly?: number;
  monthly?: number;
  nightly?: number;
};

export type SellerInfo = {
  name?: string;
  email?: string;
  phone?: string;
};

export type User = {
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  sender: string;
  recipient: string;
  property: string;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FinalType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
export type Override<
  T,
  U extends Partial<Record<keyof T, unknown>>
> = FinalType<Omit<T, keyof U> & U>;
