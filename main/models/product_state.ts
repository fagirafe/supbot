export interface ProductState {
  message: string;
  found: boolean;
  stock_level: boolean | null;
  productId: string | null;
  styleId: string | null;
  sizeId: string | null;
}
