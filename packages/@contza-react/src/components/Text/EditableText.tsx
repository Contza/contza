import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useInteraction } from "../../providers/InteractionProvider";
import { useContza } from "../../providers/ContzaProvider";
import { useContent } from "../../providers/ContentProvider";
import { TextProps } from "./index";
import "./Text.css";

interface EditableTextProps extends TextProps {
    name: string;
}

const EditableText = (props: EditableTextProps) => {
    const { name, placeholder } = props;

    const { sendEditorEvent } = useContza();
    const { content } = useContent();
    const { registerField } = useContzaFields();
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    let { value, path } = registerField(name, "text");
    value = value?.toString();

    return (
        <span
            id={`contza-${path.join(".")}`}
            dangerouslySetInnerHTML={{ __html: value ?? "" }}
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
        />
    );
};

export default EditableText;
