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
}