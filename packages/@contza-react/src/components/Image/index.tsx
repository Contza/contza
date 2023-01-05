import { useContza } from "../../providers/ContzaProvider";
import { ContzaImage } from "../../types";
import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";

type ImageElementAttributes = Omit<Partial<React.HTMLAttributes<HTMLImageElement>>, "children">;
type ContzaImageElementAttributes = ImageElementAttributes & ContzaImage;

export interface ImageProps extends Omit<ImageElementAttributes, "children"> {
    name: string;
    children?: (image: ContzaImageElementAttributes) => JSX.Element;
}

const EditableImage = React.lazy(() => import("./EditableImage"));

const Image = (props: ImageProps) => {
    const { name, children } = props;

    const { editMode } = useContza();
    const { registerField } = useContzaFields();
    const { value } = registerField(name, "image");

    const imageProps: ContzaImageElementAttributes = {
        ...(props as any),
        children: undefined,
        src: value?.src,
        alt: value?.alt ?? "Image",
    };

    const imageElement = children ? children(imageProps) : <img {...imageProps} />;

    if (!editMode) return imageElement;

    return <EditableImage name={name} children={imageElement} />;
};

export default Image;
