import { gqlr } from "@/core/modules/shared";
import type { Price } from "../../domain/entities";

export namespace UpdatePriceStatus {
  export type Params = {
    priceId: string;
    status: Price.Status;
  };

  export type Result = Price.Model;
}

const UPDATE_PRICE_STATUS_MUTATION = `#graphql
  mutation UpdatePriceStatus($input: UpdatePriceStatusInput!) {
    updatePriceStatus(input: $input) {
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

export const updatePriceStatus = async (params: UpdatePriceStatus.Params): Promise<UpdatePriceStatus.Result> => {
  return gqlr<UpdatePriceStatus.Result>(UPDATE_PRICE_STATUS_MUTATION, { input: params });
}; 