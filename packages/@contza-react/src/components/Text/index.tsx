import * as React from "react";
import useContzaFields from "../../hooks/useContzaFields";
import { useContza } from "../../providers/ContzaProvider";
import { parseHtml } from "../../utils";

export interface TextProps {
    children?: string;
    name?: string;
    placeholder?: string;
}

const EditableText = React.lazy(() => import("./EditableText"));

const Text = (props: TextProps) => {
    const { children, name, placeholder = `Enter ${children ?? name}...`} = props;
    const fieldName = children ?? name;

    if (!fieldName) {
        throw new Error(
            "You must specify the name of the field by adding it to the 'children' or 'name' prop."
        );
    }

    const { editMode } = useContza();
    const { registerField } = useContzaFields();

    let { value } = registerField(fieldName, "text", fieldName);
    value = value?.toString();

    if (!editMode && value === "") return <>{fieldName}</>;
    if (!editMode) return <>{parseHtml(value)}</>;

    return <EditableText name={fieldName} placeholder={placeholder} />;
};

export default Text;
