export interface ContzaContent {
    name: string;
    originalSlug: string;
    slug: string;
    locale: string;
    data: Record<string, any>;
    updatedAt: string;
    createdAt: string;
}

export interface ContzaQueryOptions {
    locale?: string;
}

export interface ContzaQueryCollectionOptions extends ContzaQueryOptions {
    limit?: number;
}

export interface ContzaSDKOptions {
    // Contza URL is used only for development purposes
    contzaUrl?: string;
}
