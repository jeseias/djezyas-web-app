import type { Id } from "../../../shared";
import type { Slug } from "../../../shared/value-objects/slug";

export namespace Product {
  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DRAFT = 'draft',
    DELETED = 'deleted'
  }

  export type Dimensions = {
    length?: number;
    width?: number;
    height?: number;
  };

  export type Model = {
    id: Id;
    name: string;
    slug: Slug;
    description?: string;
    categoryId: Id;
    productTypeId: Id;
    status: Status;
    organizationId: Id;
    createdById: Id;
    imageUrl?: string;
    sku?: string;
    barcode?: string;
    weight?: number;
    dimensions?: Dimensions;
    meta?: any;
    createdAt: Date;
    updatedAt: Date;
  };
} 