import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useContza } from "../../providers/ContzaProvider";
import { ContzaImage } from "../../types";

type ImageElementAttributes = Omit<Partial<React.ImgHTMLAttributes<HTMLImageElement>>, "children">;
type ContzaImageProps = ImageElementAttributes & ContzaImage;

export interface ImageProps extends ImageElementAttributes {
    name: string;
    children?: (image: ContzaImageProps) => JSX.Element;
}

const EditableImage = React.lazy(() => import("./EditableImage"));

const Image = (props: ImageProps) => {
    const { name, children } = props;

    const { editMode } = useContza();
    const { registerField } = useContzaFields();
    const { value } = registerField(name, "image");

    const imageProps: ContzaImageProps = {
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
