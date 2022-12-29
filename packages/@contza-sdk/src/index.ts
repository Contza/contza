import {
    ContzaContent,
    ContzaQueryCollectionOptions,
    ContzaQueryOptions,
    ContzaSDKOptions,
} from "./types";
import { formatSlug } from "./utils";

const contzaApiUrl: string = "https://app.contza.com/api";

export default class ContzaSDK {
    private readonly websiteId: string;
    private readonly apiKey: string;
    private readonly apiUrl: string;
    private readonly defaultRequestHeaders: HeadersInit;

    constructor(websiteId: string, apiKey: string, options?: ContzaSDKOptions) {
        this.websiteId = websiteId;
        this.apiKey = apiKey;
        this.apiUrl = options?.contzaUrl ?? contzaApiUrl;
        this.defaultRequestHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
        };
    }

    private async request<T>(method: "GET", endpoint: string): Promise<T> {
        const response = await fetch(this.apiUrl + endpoint, {
            method,
            headers: this.defaultRequestHeaders,
        });

        const data = await response.json();

        if (!response.ok) {
            throw "Contza - " + (data.message ?? "Unknown error occurred");
        }

        return data;
    }

    public async findOne(slug: string, options?: ContzaQueryOptions): Promise<ContzaContent> {
        const parameters = new URLSearchParams({
            ...(options?.locale && { locale: options.locale }),
        });

        const basePath = `/website/${this.websiteId}/content`;
        const endpoint = `${basePath}/${formatSlug(slug)}?${parameters.toString()}`;

        return await this.request<ContzaContent>("GET", endpoint);
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

        const contents = await this.request<ContzaContent[]>("GET", endpoint);
        return contents ?? [];
    }
}
