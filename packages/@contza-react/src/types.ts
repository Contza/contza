export { ContzaContent } from "@contza/client";

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
    url?: string;
    data: any;
}
