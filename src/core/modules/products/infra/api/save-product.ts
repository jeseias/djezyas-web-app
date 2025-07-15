import { gqlr } from "@/core/modules/shared";
import type { Product } from "../../domain/entities";

export namespace SaveProduct {
  export type Dimensions = {
    length?: number;
    width?: number;
    height?: number;
  };

  export type Params = {
    id?: string;
    name: string;
    description?: string;
    categoryId: string;
    productTypeId: string;
    status?: Product.Status;
    imageUrl?: string;
    sku?: string;
    barcode?: string;
    weight?: number;
    dimensions?: Dimensions;
    meta?: any;
  };

  export type Result = Product.Model;
}

const SAVE_PRODUCT_MUTATION = `#graphql
  mutation SaveProduct($input: SaveProductInput!) {
    saveProduct(input: $input) {
      id
      name
      slug
      description
      categoryId
      productTypeId
      status
      organizationId
      createdById
      imageUrl
      sku
      barcode
      weight
      dimensions {
        length
        width
        height
      }
      meta
      createdAt
      updatedAt
    }
  }
`;

export const saveProduct = async (params: SaveProduct.Params): Promise<SaveProduct.Result> => {
  return gqlr<SaveProduct.Result>(SAVE_PRODUCT_MUTATION, { input: params });
}; 