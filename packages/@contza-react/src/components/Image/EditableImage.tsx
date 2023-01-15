import { useContza } from "../../providers/ContzaProvider";
import { useInteraction } from "../../providers/InteractionProvider";
import "./Image.css";
import { ImageProps } from "./index";
import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useContent } from "../../providers/ContentProvider";

export interface EditableImageProps extends Omit<ImageProps, "children"> {
    children: React.ReactNode;
}

const EditableImage = (props: EditableImageProps) => {
    const { name, children } = props;

    const { registerField } = useContzaFields();
    const { path } = registerField(name, "image");

    const { sendEditorEvent } = useContza();
    const { content } = useContent();
    const { resizeHoverBox, hideHoverBox } = useInteraction();

    return (
        <span
            id={`contza-${path.join(".")}`}
            className="contza-image"
            onClick={() => {
                sendEditorEvent({
                    type: "onFocus",
                    contentEntryId: content?.id,
                    data: { type: "image", path: path },
                });
            }}
            onMouseEnter={(e) => resizeHoverBox(e.currentTarget)}
            onMouseLeave={() => hideHoverBox()}
        >
            {children}
        </span>
    );
};

export default EditableImage;
