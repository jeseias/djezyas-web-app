import { gqlr } from "@/core/modules/shared";
import type { Product } from "../../domain/entities";

export namespace UpdateProductStatus {
  export type Params = {
    productId: string;
    status: Product.Status;
  };

  export type Result = Product.Model;
}

const UPDATE_PRODUCT_STATUS_MUTATION = `#graphql
  mutation UpdateProductStatus($input: UpdateProductStatusInput!) {
    updateProductStatus(input: $input) {
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

export const updateProductStatus = async (params: UpdateProductStatus.Params): Promise<UpdateProductStatus.Result> => {
  return gqlr<UpdateProductStatus.Result>(UPDATE_PRODUCT_STATUS_MUTATION, { input: params });
}; 