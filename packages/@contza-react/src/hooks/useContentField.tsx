import { ContzaContentFieldType } from "../types";
import { useList, useListItem } from "../providers/ListProvider";
import { defaultFieldValue } from "../utils";
import { useEffect } from "react";
import { useContent } from "../providers/ContentProvider";

const useContentField = (
    fieldName: string,
    type: ContzaContentFieldType
): {
    value: any;
    path: string[];
} => {
    const { getField, setField, setFieldsSchema } = useContent();

    const list = useList();
    const listItem = useListItem();

    const isInList: boolean = !!list.name;
    const defaultValue = defaultFieldValue[type];
    const fieldPath: string[] = isInList ? [...listItem.path, fieldName] : [fieldName];
    const fieldValue = getField(fieldPath)?.value ?? defaultValue;

    useEffect(() => {
        if (!fieldValue) {
            setField(fieldPath, type, defaultValue);
        }

        setFieldsSchema((oldFieldsSchema) => ({
            ...oldFieldsSchema,
            [fieldPath.join(".")]: { type, value: defaultValue },
        }));
    }, []);

    return {
        value: fieldValue ?? defaultValue,
        path: fieldPath,
    };
};

export default useContentField;
