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

export type ContzaContentFieldType = "text" | "rawText" | "richText" | "image" | "list" | "boolean";

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
    contentEntryId?: string;
    data: any;
}
