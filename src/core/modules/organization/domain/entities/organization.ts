import type { Id, Url } from "@/core/modules/shared";
import type { Slug } from "@/core/modules/shared/value-objects/slug";

export namespace Organization {
  export enum Status {
		ACTIVE = "active",
		DISABLED = "disabled",
		PENDING = "pending",
	}

  export enum PlanType {
		FREE = "free",
		PRO = "pro",
		ENTERPRISE = "enterprise",
	}

  export enum MemberRole {
		OWNER = "owner",
		ADMIN = "admin",
		MEMBER = "member",
	}

  export enum InvitationRole {
		ADMIN = "admin",
		MEMBER = "member",
	}

  export enum InvitationStatus {
		PENDING = "pending",
		ACCEPTED = "accepted",
		EXPIRED = "expired",
	}

  export enum SettingKey {
		THEME = "theme",
		TIMEZONE = "timezone",
		NOTIFICATIONS = "notifications",
	}

  export type Settings = Partial<Record<SettingKey, unknown>>;

  export type Model = {
		id: Id;
		name: string;
		slug: Slug;
		ownerId: Id;
		createdAt: Date;
		updatedAt: Date;
		status?: Status;
		plan?: PlanType;
		logoUrl?: Url;
		settings?: Settings;
		meta?: Record<string, unknown>;
	};

  export type Summary = {
    id: Id;
		name: string;
		slug: Slug;
		logoUrl?: Url;
    plan?: PlanType;
  }

  export type MemberUser = {
    name: string;
    avatar?: string;
    email: string;
  }

  export type Member = {
    id: Id;
    organizationId: Id;
    userId: Id;
    role: MemberRole;
    invitedAt: string;
    joinedAt?: string;
    user: MemberUser;
  }

  export type Invitation = {
    id: Id;
    organizationId: Id;
    email: string;
    role: InvitationRole;
    token: string;
    invitedAt: string;
    acceptedAt?: string;
    status: InvitationStatus;
  }
}