import * as React from "react";
import { useContza } from "../../providers/ContzaProvider";
import useContzaFields from "../../hooks/useContzaFields";

export interface RawTextProps {
    children?: string;
    name?: string;
    placeholder?: string;
}

const EditableRawText = React.lazy(() => import("./EditableRawText"));

const RawText = (props: RawTextProps) => {
    const { children, name, placeholder = `Enter ${children ?? name}...` } = props;
    const fieldName = children ?? name;

    if (!fieldName) {
        throw new Error(
            "You must specify the name of the field by adding it to the 'children' or 'name' prop."
        );
    }

    const { editMode } = useContza();
    const { registerField } = useContzaFields();

    let { value } = registerField(fieldName, "rawText", fieldName);
    value = value?.toString();

    if (!editMode) return value;

    return <EditableRawText name={fieldName} placeholder={placeholder} />;
};

export default RawText;
