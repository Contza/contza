import { useContent } from "../providers/ContentProvider";
import { useList, useListItem } from "../providers/ListProvider";
import { defaultFieldValue } from "../utils";
import { useContza } from "../providers/ContzaProvider";
import { ContzaContentFieldType, ContzaImage } from "../types";

type FieldNameArgument = ReadonlyArray<string> | string;

interface ContzaFields {
    registerField: (
        fieldName: string,
        type: ContzaContentFieldType,
        defaultValue?: any
    ) => { value: any; path: string[] };
    text: (name: FieldNameArgument) => string;
    image: (name: FieldNameArgument) => ContzaImage;
}

const useContzaFields = (): ContzaFields => {
    const { sendEditorEvent } = useContza();
    const { getField } = useContent();

    const list = useList();
    const listItem = useListItem();
    const isInList: boolean = !!list.name;

    const getFieldName = (argument: FieldNameArgument): string =>
        Array.isArray(argument) ? argument[0] : argument;

    const registerField = (fieldName: string, type: ContzaContentFieldType, defaultValue?: any) => {
        const fieldPath: string[] = isInList ? [...listItem.path, fieldName] : [fieldName];
        defaultValue = defaultValue ?? defaultFieldValue[type];

        sendEditorEvent({
            type: "onFieldsSchema",
            data: { [fieldPath.join(".")]: { type, value: defaultValue } },
        });

        return {
            value: getField(fieldPath)?.value ?? defaultValue,
            path: fieldPath,
        };
    };

    const text = (argument: FieldNameArgument): string => {
        return registerField(getFieldName(argument), "text")?.value;
    };

    const image = (argument: FieldNameArgument): ContzaImage => {
        return registerField(getFieldName(argument), "image")?.value;
    };

    return {
        registerField,
        text,
        image,
    };
};

export default useContzaFields;
