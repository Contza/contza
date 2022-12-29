import useContentField from "../../hooks/useContentField";
import { useContza } from "../../providers/ContzaProvider";
import { ContzaImage } from "../../types";
import React from "react";

type ImageElementAttributes = Partial<React.HTMLAttributes<HTMLImageElement>>;
type ContzaImageElementAttributes = ImageElementAttributes & ContzaImage;

export interface ImageProps extends Omit<ImageElementAttributes, "children"> {
    name: string;
    children?: (image: ContzaImageElementAttributes) => JSX.Element;
}

const EditableImage = React.lazy(() => import("./EditableImage"));

const Image = (props: ImageProps) => {
    const { name, children } = props;

    const { editMode } = useContza();
    const { value } = useContentField(name, "image");

    const imageProps: ContzaImageElementAttributes = {
        ...(props as any),
        src: value?.src,
        alt: value?.alt ?? "Contza image",
    };

    const imageElement = children ? children(imageProps) : <img {...imageProps} />;

    if (!editMode) return imageElement;

    return <EditableImage name={name} children={imageElement} />;
};

export default Image;
