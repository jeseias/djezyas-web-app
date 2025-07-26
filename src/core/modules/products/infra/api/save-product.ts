import type { Product } from "../../domain/entities";
import { api } from "@/core/modules/shared";

export namespace SaveProduct {
  export type Dimensions = {
    length: number;
    width: number;
    height: number;
  };

  export type Price = {
    currency: string;
    unitAmount: number;
    type?: string;
    status?: string;
    validFrom?: Date;
    validUntil?: Date;
  };

  export type Params = {
    id?: string;
    name: string;
    description?: string;
    categoryId: string;
    productTypeId: string;
    status?: Product.Status;
    organizationId: string;
    imageUrl?: File;
    sku?: string;
    barcode?: string;
    weight?: number;
    dimensions?: Dimensions;
    meta?: Record<string, any>;
    price: Price;
  };

  export type Result = Product.Model;
}

export const saveProduct = async (params: SaveProduct.Params): Promise<SaveProduct.Result> => {
  const formData = new FormData();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'dimensions' && typeof value === 'object') {
        const dimensions = value as SaveProduct.Dimensions;
        formData.append('dimensions[length]', String(dimensions.length));
        formData.append('dimensions[width]', String(dimensions.width));
        formData.append('dimensions[height]', String(dimensions.height));
      } else if (key === 'price' && typeof value === 'object') {
        const price = value as SaveProduct.Price;
        formData.append('price[currency]', price.currency);
        formData.append('price[unitAmount]', String(price.unitAmount));
        if (price.type) formData.append('price[type]', price.type);
        if (price.status) formData.append('price[status]', price.status);
        if (price.validFrom) formData.append('price[validFrom]', price.validFrom.toISOString());
        if (price.validUntil) formData.append('price[validUntil]', price.validUntil.toISOString());
      } else if (key === 'meta' && typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await api.post<SaveProduct.Result>('/api/v1/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
}; 