import type { Id, Phone, Password, Url } from "../../shared/value-objects";
import type { Email, Username } from "../value-objects";

export namespace User {
  export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    BLOCKED = "blocked",
  }

  export enum UserRole {
    ADMIN = "admin",
    USER = "user",
  }

  export type Model = {
    id: Id;
    name: string;
    email: Email;
    username: Username;
    phone: Phone;
    password: Password;
    bio: string | null;
    avatar?: Url;
    status: UserStatus;
    role: UserRole;
    emailVerifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}