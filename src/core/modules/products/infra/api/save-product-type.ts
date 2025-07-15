import { gqlr } from "@/core/modules/shared";
import type { ProductType } from "../../domain/entities";

export namespace SaveProductType {
  export type Params = {
    id?: string;
    name: string;
    description?: string;
    organizationId: string;
  };

  export type Result = ProductType.Model;
}

const SAVE_PRODUCT_TYPE_MUTATION = `#graphql
  mutation SaveProductType($input: SaveProductTypeInput!) {
    saveProductType(input: $input) {
      id
      name
      slug
      description
      createdById
      organizationId
      createdAt
      updatedAt
    }
  }
`;

export const saveProductType = async (params: SaveProductType.Params): Promise<SaveProductType.Result> => {
  return gqlr<SaveProductType.Result>(SAVE_PRODUCT_TYPE_MUTATION, { input: params });
}; 