import {
    ContzaClientOptions,
    ContzaContent,
    ContzaQueryCollectionOptions,
    ContzaQueryOptions,
} from "./types";
import { CONTZA_PRODUCTION_URL, formatSlug } from "./utils";

export class ContzaClient {
    private readonly websiteId: string;
    private readonly apiKey: string;
    private readonly apiUrl: string;
    private readonly defaultRequestHeaders: HeadersInit;

    constructor(websiteId: string, apiKey: string, options?: ContzaClientOptions) {
        if (!websiteId) throw "@contza/client - websiteId was not specified";
        if (!apiKey) throw "@contza/client - apiKey was not specified";

        this.websiteId = websiteId;
        this.apiKey = apiKey;
        this.apiUrl = (options?.contzaUrl ?? CONTZA_PRODUCTION_URL) + "/api";
        this.defaultRequestHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
        };
    }

    private async request<T>(endpoint: string): Promise<T> {
        const response = await fetch(this.apiUrl + endpoint, {
            method: "GET",
            headers: this.defaultRequestHeaders,
        });

        const data = await response.json();

        if (!response.ok) {
            throw "@contza/client - " + (data.message ?? "Unknown error occurred");
        }

        return data;
    }

    public async findOne(slug: string, options?: ContzaQueryOptions): Promise<ContzaContent> {
        const parameters = new URLSearchParams({
            ...(options?.locale && { locale: options.locale }),
        });

        const basePath = `/website/${this.websiteId}/content`;
        const endpoint = `${basePath}/${formatSlug(slug)}?${parameters.toString()}`;

        return await this.request<ContzaContent>(endpoint);
    }

    public async findMany(
        slug: string,
        options?: ContzaQueryCollectionOptions
    ): Promise<ContzaContent[]> {
        const parameters = new URLSearchParams({
            isCollection: "true",
            ...(options?.locale && { locale: options.locale }),
        });

        const basePath = `/website/${this.websiteId}/content`;
        const endpoint = `${basePath}/${formatSlug(slug)}?${parameters.toString()}`;

        const contents = await this.request<ContzaContent[]>(endpoint);

        return contents ?? [];
    }
}

export * from "./types";
