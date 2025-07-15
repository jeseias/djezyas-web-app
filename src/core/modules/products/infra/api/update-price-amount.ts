import { gqlr } from "@/core/modules/shared";
import type { Price } from "../../domain/entities";

export namespace UpdatePriceAmount {
  export type Params = {
    priceId: string;
    amount: number;
  };

  export type Result = Price.Model;
}

const UPDATE_PRICE_AMOUNT_MUTATION = `#graphql
  mutation UpdatePriceAmount($input: UpdatePriceAmountInput!) {
    updatePriceAmount(input: $input) {
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

export const updatePriceAmount = async (params: UpdatePriceAmount.Params): Promise<UpdatePriceAmount.Result> => {
  return gqlr<UpdatePriceAmount.Result>(UPDATE_PRICE_AMOUNT_MUTATION, { input: params });
}; 