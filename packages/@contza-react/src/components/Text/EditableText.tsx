import { useInteraction } from "../../providers/InteractionProvider";
import "./Text.css";
import { TextProps } from "./index";
import * as React from "react";
import { useContza } from "../../providers/ContzaProvider";
import useContzaFields from "../../hooks/useContzaFields";
import { useContent } from "../../providers/ContentProvider";

interface EditableTextProps extends TextProps {
    name: string;
}

const EditableText = (props: EditableTextProps) => {
    const { name, placeholder, isRaw } = props;

    const { sendEditorEvent } = useContza();
    const { content } = useContent();
    const { registerField } = useContzaFields();
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    let { value, path } = registerField(name, isRaw ? "rawText" : "text");
    value = value?.toString();

    return (
        <span
            id={`contza-${path.join(".")}`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="contza-text"
            placeholder={placeholder}
            onMouseEnter={(e) => resizeHoverBox(e.currentTarget)}
            onMouseLeave={() => hideHoverBox()}
            onBlur={() => hideFocusBox()}
            onFocus={(e) => {
                resizeFocusBox(e.currentTarget);
                sendEditorEvent({
                    type: "onFocus",
                    contentEntryId: content?.id,
                    data: { type: "text", path },
                });
            }}
            {...(isRaw
                ? { children: value ?? "" }
                : { dangerouslySetInnerHTML: { __html: value ?? "" } })}
        />
    );
};

export default EditableText;
