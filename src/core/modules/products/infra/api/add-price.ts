import { gqlr } from "@/core/modules/shared";
import type { Price } from "../../domain/entities/price";

export namespace AddPrice {
  export type Params = {
    productId: string;
    currencyId: string;
    amount: number;
    type?: Price.Type;
    status?: Price.Status;
    validFrom?: Date;
    validUntil?: Date;
  };

  export type Result = Price.Model;
}

const ADD_PRICE_MUTATION = `#graphql
  mutation AddPrice($input: AddPriceInput!) {
    addPrice(input: $input) {
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

export const addPrice = async (params: AddPrice.Params): Promise<AddPrice.Result> => {
  return gqlr<AddPrice.Result>(ADD_PRICE_MUTATION, { input: params });
}; 