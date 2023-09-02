import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useContza } from "../../providers/ContzaProvider";
import { ContzaImage } from "../../types";

type ImageElementAttributes = Omit<Partial<React.ImgHTMLAttributes<HTMLImageElement>>, "children">;
type ContzaImageProps = ImageElementAttributes & ContzaImage;

export interface ImageProps extends ImageElementAttributes {
    name?: string;
    children?: ((image: ContzaImageProps) => JSX.Element) | string;
}

const EditableImage = React.lazy(() => import("./EditableImage"));

const Image = (props: ImageProps) => {
    const { name, children, ...otherProps } = props;

    const childrenIsFunction = children instanceof Function;
    const fieldName = childrenIsFunction ? name : children ?? name;

    if (!fieldName) {
        throw "You must specify the name of the field by adding it to the 'children' or 'name' prop.";
    }

    const { editMode } = useContza();
    const { registerField } = useContzaFields();
    const { value } = registerField(fieldName, "image");

    const imageProps: ContzaImageProps = {
        ...otherProps,
        src: value?.src,
        alt: value?.alt ?? "Image",
    };

    const imageElement =
        children && childrenIsFunction ? children(imageProps) : <img {...imageProps} />;

    if (!editMode) return imageElement;

    return <EditableImage name={fieldName} children={imageElement} />;
};

export default Image;
