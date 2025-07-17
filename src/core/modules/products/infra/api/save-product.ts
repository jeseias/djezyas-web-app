import type { Product } from "../../domain/entities";
import { api } from "@/core/modules/shared";

export namespace SaveProduct {
  export type Dimensions = {
    length: number;
    width: number;
    height: number;
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
  };

  export type Result = Product.Model;
}

export const saveProduct = async (params: SaveProduct.Params): Promise<SaveProduct.Result> => {
  const formData = new FormData();
  
  // Add all fields to FormData
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'dimensions' && typeof value === 'object') {
        // Handle dimensions by adding each dimension as a separate field
        const dimensions = value as SaveProduct.Dimensions;
        formData.append('dimensions[length]', String(dimensions.length));
        formData.append('dimensions[width]', String(dimensions.width));
        formData.append('dimensions[height]', String(dimensions.height));
      } else if (key === 'meta' && typeof value === 'object') {
        // Handle meta by stringifying it
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        // Handle File objects
        formData.append(key, value);
      } else {
        // Convert all other types to string
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