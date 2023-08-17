import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useInteraction } from "../../providers/InteractionProvider";
import { RawTextProps } from "./index";
import { useContza } from "../../providers/ContzaProvider";
import { useContent } from "../../providers/ContentProvider";
import "./RawText.css";

interface EditableTextProps extends RawTextProps {
    name: string;
}

const EditableRawText = (props: EditableTextProps) => {
    const { name, placeholder } = props;

    const { sendEditorEvent } = useContza();
    const { content } = useContent();
    const { registerField } = useContzaFields();
    const { resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox } = useInteraction();

    let { value, path } = registerField(name, "rawText");
    value = value?.toString();

    return (
        <span
            id={`contza-${path.join(".")}`}
            children={value ?? ""}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="contza-raw-text"
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

export default EditableRawText;
