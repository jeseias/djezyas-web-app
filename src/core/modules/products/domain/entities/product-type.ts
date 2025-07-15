import type { Id } from "../../../shared";
import type { Slug } from "../../../shared/value-objects/slug";

export namespace ProductType {
  export type Model = {
    id: Id;
    name: string;
    slug: Slug;
    description?: string;
    createdById: Id;
    organizationId: Id;
    createdAt: Date;
    updatedAt: Date;
  };
} 