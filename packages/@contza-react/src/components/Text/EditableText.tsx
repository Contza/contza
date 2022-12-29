import useContentField from "../../hooks/useContentField";
import { useInteraction } from "../../providers/InteractionProvider";
import "./Text.css";
import { TextProps } from "./index";
import React from "react";
import { useContza } from "../../providers/ContzaProvider";

interface EditableTextProps extends TextProps {
    name: string;
}

const EditableText = (props: EditableTextProps) => {
    const { name, placeholder } = props;

    const { sendEditorEvent } = useContza();
    const { value, path } = useContentField(name, "text");
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    return (
        <span
            id={`contza-${path.join(".")}`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{ __html: value ?? "" }}
            className="contza-text"
            placeholder={placeholder}
            onMouseEnter={(e) => resizeHoverBox(e.currentTarget)}
            onMouseLeave={() => hideHoverBox()}
            onBlur={() => hideFocusBox()}
            onFocus={(e) => {
                resizeFocusBox(e.currentTarget);
                sendEditorEvent({
                    type: "onFocus",
                    data: { type: "text", path: path },
                });
            }}
        />
    );
};

export default EditableText;
