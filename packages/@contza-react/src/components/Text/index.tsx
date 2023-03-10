import { useContza } from "../../providers/ContzaProvider";
import { parseHtml } from "../../utils";
import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";

export interface TextProps {
    children?: string;
    name?: string;
    placeholder?: string;
    isRaw?: boolean;
}

const EditableText = React.lazy(() => import("./EditableText"));

const Text = (props: TextProps) => {
    const { children, name, placeholder = `Enter ${children ?? name}...`, isRaw = false } = props;
    const fieldName = children ?? name;

    if (!fieldName) {
        throw new Error(
            "You must specify the name of the field by adding it to the 'children' or 'name' prop."
        );
    }

    const { editMode } = useContza();
    const { registerField } = useContzaFields();

    let { value } = registerField(fieldName, isRaw ? "rawText" : "text", fieldName);
    value = value?.toString();

    if (!editMode && isRaw) return value;
    if (!editMode && value === "") return <>{fieldName}</>;
    if (!editMode) return <>{parseHtml(value)}</>;

    return <EditableText name={fieldName} placeholder={placeholder} isRaw={isRaw} />;
};

export default Text;
