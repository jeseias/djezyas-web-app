import type { Id } from "../../../shared";
import type { Slug } from "../../../shared/value-objects/slug";

export namespace ProductCategory {
  export type Model = {
    id: Id;
		name: string;
		slug: Slug;
		description?: string;
		createdAt: Date;
		updatedAt: Date;
  }
}