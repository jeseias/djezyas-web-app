import { gqlr } from "@/core/modules/shared";
import type { Product } from "../../domain/entities";

export namespace GetProductById {
  export type Params = {
    productId: string;
  };

  export type Result = Product.Model;
}

const GET_PRODUCT_BY_ID_QUERY = `#graphql
  query GetProductById($input: GetProductByIdInput!) {
    getProductById(input: $input) {
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

export const getProductById = async (params: GetProductById.Params): Promise<GetProductById.Result> => {
  const result = await gqlr<{ data: { getProductById: GetProductById.Result } }>(GET_PRODUCT_BY_ID_QUERY, { input: params });

  return result.data.getProductById;
}; 