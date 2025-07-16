import { gqlr } from "@/core/modules/shared";
import type { ProductType } from "../../domain/entities";

export namespace ListProductTypes {
  export type Params = {
    organizationId: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
    search?: string;
  };

  export type Result = {
    items: ProductType.Model[];
    totalItems: number;
  };
}

const LIST_PRODUCT_TYPES_QUERY = `#graphql
  query ListProductTypes($input: ListProductTypesInput!) {
    listProductTypes(input: $input) {
      items {
        id
        name
        slug
        description
        createdById
        organizationId
        createdAt
        updatedAt
      }
      totalItems
    }
  }
`;

export const listProductTypes = async (params: ListProductTypes.Params): Promise<ListProductTypes.Result> => {
  const result = await gqlr<{ data: { listProductTypes: ListProductTypes.Result } }>(LIST_PRODUCT_TYPES_QUERY, { input: params });
  console.log(result);
  return {
    items: result.data.listProductTypes.items,
    totalItems: result.data.listProductTypes.totalItems,
  };
}; 