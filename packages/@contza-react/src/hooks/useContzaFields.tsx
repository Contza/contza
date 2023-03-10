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
    rawText: (name: FieldNameArgument) => string;
    text: (name: FieldNameArgument) => string;
    image: (name: FieldNameArgument) => ContzaImage;
    boolean: (name: FieldNameArgument) => boolean;
}

const useContzaFields = (): ContzaFields => {
    const { sendEditorEvent } = useContza();
    const { getField, content } = useContent();

    const list = useList();
    const listItem = useListItem();
    const isInList: boolean = !!list.name;

    const getFieldName = (argument: FieldNameArgument): string =>
        Array.isArray(argument) ? argument[0] : argument;

    const registerField = (fieldName: string, type: ContzaContentFieldType, defaultValue?: any) => {
        const fieldPath: string[] = isInList ? [...listItem.path, fieldName] : [fieldName];

        defaultValue = defaultValue ?? defaultFieldValue[type];

        sendEditorEvent({
            type: "onFieldSchema",
            contentEntryId: content?.id,
            data: { [fieldPath.join(".")]: { type, value: defaultValue } },
        });

        return {
            value: getField(fieldPath)?.value ?? defaultValue,
            path: fieldPath,
        };
    };

    const rawText = (argument: FieldNameArgument): string => {
        return (
            registerField(getFieldName(argument), "rawText")?.value?.toString() ??
            defaultFieldValue["rawText"]
        );
    };

    const text = (argument: FieldNameArgument): string => {
        return (
            registerField(getFieldName(argument), "text")?.value?.toString() ??
            defaultFieldValue["text"]
        );
    };

    const image = (argument: FieldNameArgument): ContzaImage => {
        return registerField(getFieldName(argument), "image")?.value ?? defaultFieldValue["image"];
    };

    const boolean = (argument: FieldNameArgument): boolean => {
        return (
            registerField(getFieldName(argument), "boolean")?.value ?? defaultFieldValue["boolean"]
        );
    };

    return {
        registerField,
        rawText,
        text,
        image,
        boolean,
    };
};

export default useContzaFields;
