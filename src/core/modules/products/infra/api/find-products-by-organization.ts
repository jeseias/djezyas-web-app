import { gqlr } from "@/core/modules/shared";
import type { Product } from "../../domain/entities";

export namespace FindProductsByOrganization {
  export type Filters = {
    status?: Product.Status;
    categoryId?: string;
    productTypeId?: string;
    search?: string;
    hasSku?: boolean;
    hasBarcode?: boolean;
    hasImage?: boolean;
    createdAfter?: Date;
    createdBefore?: Date;
    updatedAfter?: Date;
    updatedBefore?: Date;
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: string;
  };

  export type Params = {
    organizationId: string;
    filters?: Filters;
  };

  export type Result = {
    items: Product.Model[];
    totalItems: number;
  };
}

const FIND_PRODUCTS_BY_ORGANIZATION_QUERY = `#graphql
  query FindProductByOrganization($input: FindProductByOrganizationInput!) {
    findProductByOrganization(input: $input) {
      items {
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
        default_price {
          id 
          currency 
          unitAmount 
          type 
        }
        meta
        createdAt
        updatedAt
      }
      totalItems
    }
  }
`;

export const findProductsByOrganization = async (params: FindProductsByOrganization.Params): Promise<FindProductsByOrganization.Result> => {
  const result = await gqlr<{ data: { findProductByOrganization: FindProductsByOrganization.Result } }>(FIND_PRODUCTS_BY_ORGANIZATION_QUERY, { input: params });

  return {
    items: result.data.findProductByOrganization.items,
    totalItems: result.data.findProductByOrganization.totalItems,
  };
}; 