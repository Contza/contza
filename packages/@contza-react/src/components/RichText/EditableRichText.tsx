import useContentField from "../../hooks/useContentField";
import { useInteraction } from "../../providers/InteractionProvider";
import "./RichText.css";
import { RichTextProps } from "./index";
import React from "react";
import RichTextRenderer from "./RichTextRenderer";
import { useContza } from "../../providers/ContzaProvider";

interface EditableRichTextProps extends RichTextProps {
    name: string;
}

const EditableRichText = (props: EditableRichTextProps) => {
    const { name, placeholder, components } = props;

    const { sendEditorEvent } = useContza();
    const { value, path } = useContentField(name, "richText");
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    return (
        <span
            id={`contza-${path.join(".")}`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="contza-rich-text"
            placeholder={placeholder}
            onMouseEnter={(e) => resizeHoverBox(e.currentTarget)}
            onMouseLeave={() => hideHoverBox()}
            onBlur={() => hideFocusBox()}
            onFocus={(e) => {
                resizeFocusBox(e.currentTarget);
                sendEditorEvent({
                    type: "onFocus",
                    data: { type: "richText", path: path },
                });
            }}
        >
            <RichTextRenderer content={value ?? {}} components={components} />
        </span>
    );
};

export default EditableRichText;
