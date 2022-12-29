import {
    ContzaContent,
    ContzaContentField,
    ContzaContentFieldType,
    ContzaEditorEvent,
} from "../types";
import { contzaUrl } from "../utils";
import { useContza } from "./ContzaProvider";
import { InteractionProvider } from "./InteractionProvider";
import React, { useContext, useEffect, useState } from "react";

interface ContentContext {
    content?: ContzaContent;
    getField: (fieldPath: string[]) => ContzaContentField | undefined;
    setField: (fieldPath: string[], type: ContzaContentFieldType, value: any) => void;
    fieldsSchema: Record<string, any>;
    setFieldsSchema: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

interface ContentProviderProps {
    children: React.ReactNode;
    content: ContzaContent;
}

export const ContentContext = React.createContext<ContentContext>({
    content: undefined,
    getField: () => undefined,
    setField: () => {},
    fieldsSchema: {},
    setFieldsSchema: () => undefined,
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = (props: ContentProviderProps) => {
    const { children, content: initialContent } = props;
    const { editMode, sendEditorEvent } = useContza();

    const [content, setContent] = useState<ContzaContent>(initialContent);
    const [fields, setFields] = useState<Record<string, any>>(initialContent.data ?? {});
    const [fieldsSchema, setFieldsSchema] = useState<Record<string, any>>({});

    const getField = (fieldPath: string[]): ContzaContentField | undefined => {
        return fields[fieldPath.join(".")];
    };
    const setField = (fieldPath: string[], type: ContzaContentFieldType, value: any): void => {
        setFields((oldFields) => ({ ...oldFields, [fieldPath.join(".")]: { type, value } }));
    };

    useEffect(() => {
        if (!editMode) return;

        setContent(initialContent);
        sendEditorEvent({ type: "onContent", data: initialContent });
        sendEditorEvent({ type: "onNavigation", data: { url: window.location.href.toString() } });
    }, [initialContent, editMode]);

    useEffect(() => {
        sendEditorEvent({ type: "onFields", data: fields });
    }, [fields]);

    useEffect(() => {
        sendEditorEvent({ type: "onFieldsSchema", data: fieldsSchema });
    }, [fieldsSchema]);

    const onEditorEvent = (e: MessageEvent) => {
        if (e.origin !== contzaUrl) return;
        const event: ContzaEditorEvent = e.data;

        switch (event.type) {
            case "onFieldsChange":
                return setFields(event.data);
            case "onFieldChange":
                const field = event.data;
                return setField(field.path, field.type, field.value);
            case "scrollToField":
                const element = document.getElementById(`contza-${event.data.path.join(".")}`);
                if (!element) return;

                return window.scrollTo({
                    behavior: "smooth",
                    top: element.getBoundingClientRect().top + window.scrollY - 50,
                });
        }
    };

    // Listen for visual editor edvents
    useEffect(() => {
        addEventListener("message", onEditorEvent);
        return () => removeEventListener("message", onEditorEvent);
    }, [editMode]);

    return (
        <ContentContext.Provider
            value={{ content, getField, setField, fieldsSchema, setFieldsSchema }}
        >
            {editMode ? <InteractionProvider>{children}</InteractionProvider> : children}
        </ContentContext.Provider>
    );
};
