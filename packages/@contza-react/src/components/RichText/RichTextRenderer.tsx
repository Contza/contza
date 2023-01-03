import * as React from "react";
import { getRichHtml, RichTextComponents } from "./index";

interface RichTextRendererProps {
    content: any;
    components?: Partial<RichTextComponents>;
}

const RichTextRenderer = (props: RichTextRendererProps) => {
    const { content, components } = props;

    try {
        return <>{getRichHtml(content, components)}</>;
    } catch (e) {
        return <>{content.toString()}</>;
    }
};

export default RichTextRenderer;
