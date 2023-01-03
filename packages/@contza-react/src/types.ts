export interface ContzaContent {
    name: string;
    originalSlug: string;
    slug: string;
    locale: string;
    data: Record<string, any>;
    updatedAt: string;
    createdAt: string;
}

export type ContzaContentFieldType = "text" | "rawText" | "richText" | "image" | "list";

export interface ContzaContentField {
    type: ContzaContentFieldType;
    value: any;
}

export interface ContzaImage {
    src: string;
    alt: string;
}

export interface ContzaEditorEvent {
    type: string;
    data: any;
}
