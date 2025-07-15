import type { Id } from "../../../shared";

export namespace Price {
  export enum Type {
    REGULAR = 'regular',
    SALE = 'sale',
    WHOLESALE = 'wholesale',
    BULK = 'bulk'
  }

  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    EXPIRED = 'expired'
  }

  export type Model = {
    id: Id;
    productId: Id;
    currencyId: Id;
    amount: number;
    type: Type;
    status: Status;
    validFrom?: Date;
    validUntil?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
} 