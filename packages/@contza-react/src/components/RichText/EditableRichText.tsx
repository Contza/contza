import { useInteraction } from "../../providers/InteractionProvider";
import "./RichText.css";
import { RichTextProps } from "./index";
import * as React from "react";
import RichTextRenderer from "./RichTextRenderer";
import { useContza } from "../../providers/ContzaProvider";
import useContzaFields from "../../hooks/useContzaFields";
import { useContent } from "../../providers/ContentProvider";

interface EditableRichTextProps extends RichTextProps {
    name: string;
}

const EditableRichText = (props: EditableRichTextProps) => {
    const { name, placeholder, components } = props;

    const { sendEditorEvent } = useContza();
    const { content } = useContent();
    const { registerField } = useContzaFields();
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    const { value, path } = registerField(name, "richText");

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
                    contentEntryId: content?.id,
                    data: { type: "richText", path: path },
                });
            }}
        >
            <RichTextRenderer content={value ?? {}} components={components} />
        </span>
    );
};

export default EditableRichText;
