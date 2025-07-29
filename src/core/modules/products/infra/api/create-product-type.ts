import { gqlr } from "@/core/modules/shared";
import type { ProductType } from "../../domain/entities";

export namespace CreateProductType {
  export type Params = {
    name: string;
    description?: string;
    organizationId: string;
    productCategoryId: string;
  };

  export type Result = ProductType.Model;
}

const CREATE_PRODUCT_TYPE_MUTATION = `#graphql
  mutation CreateProductType($input: SaveProductTypeInput!) {
    saveProductType(input: $input) {
      id
      name
      slug
      description
      productCategoryId
      createdById
      organizationId
      createdAt
      updatedAt
    }
  }
`;

export const createProductType = async (params: CreateProductType.Params): Promise<CreateProductType.Result> => {
  return gqlr<CreateProductType.Result>(CREATE_PRODUCT_TYPE_MUTATION, { input: params });
}; 