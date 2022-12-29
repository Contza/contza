import useContentField from "../../hooks/useContentField";
import { useContza } from "../../providers/ContzaProvider";
import { useInteraction } from "../../providers/InteractionProvider";
import "./Image.css";
import { ImageProps } from "./index";
import React from "react";

export interface EditableImageProps extends Omit<ImageProps, "children"> {
    children: React.ReactNode;
}

const EditableImage = (props: EditableImageProps) => {
    const { name, children } = props;

    const { path } = useContentField(name, "image");

    const { sendEditorEvent } = useContza();
    const { resizeHoverBox, hideHoverBox } = useInteraction();

    return (
        <span
            id={`contza-${path.join(".")}`}
            className="contza-image"
            onClick={() => {
                sendEditorEvent({
                    type: "onFocus",
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
