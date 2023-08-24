export interface ContzaClientOptions {
    // Contza URL is used only for development purposes
    contzaUrl?: string;
}

export interface ContzaQueryOptions {
    locale?: string;
}

export interface ContzaQueryCollectionOptions extends ContzaQueryOptions {
    limit?: number;
}

export interface ContzaContent {
    id: string;
    name: string;
    slug: string;
    path: string;
    locale: string;
    data: Record<string, any>;
    updatedAt: string;
    createdAt: string;
}
