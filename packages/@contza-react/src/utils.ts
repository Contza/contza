import htmlReactParser from "html-react-parser";
import { ContzaContentFieldType } from "./types";

export const CONTZA_PRODUCTION_URL = "https://app.contza.com";

export const parseHtml = (html: string = "") => htmlReactParser(html);

export const defaultFieldValue: Record<ContzaContentFieldType, any> = {
    rawText: "",
    text: "",
    richText: "",
    image: { src: null, alt: null },
    list: [],
    boolean: false,
};
