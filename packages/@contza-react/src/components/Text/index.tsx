import useContentField from "../../hooks/useContentField";
import { useContza } from "../../providers/ContzaProvider";
import { parseHtml } from "../../utils";
import React from "react";

export interface TextProps {
    children?: string;
    name?: string;
    placeholder?: string;
}

const EditableText = React.lazy(() => import("./EditableText"));

const Text = (props: TextProps) => {
    const { children, name, placeholder = `Enter ${children ?? name}...` } = props;
    const fieldName = children ?? name;

    if (!fieldName) {
        throw new Error(
            "You must specify the name of the field by adding it to the 'children' or 'name' prop."
        );
    }

    const { editMode } = useContza();
    const { value } = useContentField(fieldName, "text");

    if (!editMode) return <>{parseHtml(value ?? fieldName)}</>;

    return <EditableText name={fieldName} placeholder={placeholder} />;
};

export default Text;
