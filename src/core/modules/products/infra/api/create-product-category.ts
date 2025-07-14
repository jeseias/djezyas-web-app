import { gqlr } from "@/core/modules/shared";
import type { ProductCategory } from "../../domain/entities";

export namespace CreateProductCategory {
	export type Params = {
		name: string;
		description?: string;
	};

	export type Result = ProductCategory.Model;
}

const CREATE_PRODUCT_CATEGORY_MUTATION = `#graphql
  mutation CreateProductCategory($input: CreateProductCategoryInput!) {
    createProductCategory(input: $input) {
      id
      name
      description
    }
  }
`

export const createProductCategory = async (params: CreateProductCategory.Params): Promise<CreateProductCategory.Result> => {
  return gqlr<CreateProductCategory.Result>(CREATE_PRODUCT_CATEGORY_MUTATION, { input: params })
}