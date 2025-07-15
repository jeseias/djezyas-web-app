import { gqlr } from "@/core/modules/shared";
import type { Price } from "../../domain/entities/price";

export namespace LoadPricesByProductId {
  export type Params = {
    productId: string;
  };

  export type Result = Price.Model[];
}

const LOAD_PRICES_BY_PRODUCT_ID_QUERY = `#graphql
  query LoadPricesByProductId($input: LoadPricesByProductIdInput!) {
    loadPricesByProductId(input: $input) {
      id
      productId
      currencyId
      amount
      type
      status
      validFrom
      validUntil
      createdAt
      updatedAt
    }
  }
`;

export const loadPricesByProductId = async (params: LoadPricesByProductId.Params): Promise<LoadPricesByProductId.Result> => {
  const result = await gqlr<{ data: { loadPricesByProductId: LoadPricesByProductId.Result } }>(LOAD_PRICES_BY_PRODUCT_ID_QUERY, { input: params });

  return result.data.loadPricesByProductId;
}; 