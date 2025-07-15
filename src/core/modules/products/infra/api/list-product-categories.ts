import { gqlr } from "@/core/modules/shared";
import type { ProductCategory } from "../../domain/entities";

export namespace ListProductCategories {
	export type Params = {
		page?: number;
		limit?: number;
		sort?: string;
		order?: string;
		search?: string;
	};

	export type Result = {
    items: ProductCategory.Model[];
    totalItems: number;
	};
}

const LIST_PRODUCT_CATEGORIES_QUERY = `#graphql
  query ListProductCategories($input: ListProductCategoriesInput!) {
    listProductCategories(input: $input) {
      items {
        id
        name
        description
      }
      totalItems
    }
  }
`

export const listProductCategories = async (params: ListProductCategories.Params): Promise<ListProductCategories.Result> => {
  const result = await  gqlr<{ data: { listProductCategories: ListProductCategories.Result } }>(LIST_PRODUCT_CATEGORIES_QUERY, { input: params })

  return {
    items: result.data.listProductCategories.items,
    totalItems: result.data.listProductCategories.totalItems,
  }
}
