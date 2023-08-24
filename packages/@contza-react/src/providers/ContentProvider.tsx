import {
    ContzaContent,
    ContzaContentField,
    ContzaContentFieldType,
    ContzaEditorEvent,
} from "../types";
import { useContza } from "./ContzaProvider";
import { InteractionProvider } from "./InteractionProvider";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface ContentContext {
    content?: ContzaContent;
    getField: (fieldPath: string[]) => ContzaContentField | undefined;
    setField: (fieldPath: string[], type: ContzaContentFieldType, value: any) => void;
}

export const ContentContext = React.createContext<ContentContext>({
    content: undefined,
    getField: () => undefined,
    setField: () => {},
});

interface ContentProviderProps {
    name: string;
    initialContent?: ContzaContent;
    children: React.ReactNode;
}

export const useContent = () => useContext(ContentContext);

export const ContentProvider = (props: ContentProviderProps) => {
    const contzaContext = useContza();

    const defaultContent: ContzaContent | undefined =
        props.initialContent ?? contzaContext.initialContents?.[props.name];

    const [content, setContent] = useState<ContzaContent | undefined>(defaultContent);
    const [fields, setFields] = useState<Record<string, any>>(defaultContent.data ?? {});

    const getField = (fieldPath: string[]): ContzaContentField | undefined => {
        return fields[fieldPath.join(".")];
    };

    const setField = (fieldPath: string[], type: ContzaContentFieldType, value: any): void => {
        setFields((oldFields) => ({ ...oldFields, [fieldPath.join(".")]: { type, value } }));
    };

    // Fetch content from API if the default content is not defined
    useEffect(() => {
        if (!defaultContent) {
            setContent(contentFromApi);
        }
    }, [defaultContent]);

    useEffect(() => {
        if (!contzaContext.editMode) return;

        setContent(defaultContent);

        contzaContext.sendEditorEvent({
            type: "onNavigation",
            data: { url: window.location.href.toString() },
        });
        contzaContext.sendEditorEvent({
            type: "onContent",
            contentEntryId: defaultContent.id,
            data: defaultContent,
        });
    }, [defaultContent, contzaContext.editMode]);

    useEffect(() => {
        contzaContext.sendEditorEvent({
            type: "onFields",
            contentEntryId: content.id,
            data: fields,
        });
    }, [fields, content, contzaContext]);

    const onEditorEvent = useCallback((e: MessageEvent) => {
        const event: ContzaEditorEvent = e.data;

        if (e.origin !== contzaContext.contzaUrl) return;
        if (event.contentEntryId !== content.id) return;

        switch (event.type) {
            case "onField":
                const field = event.data;
                return setField(field.path, field.type, field.value);
            case "onFields":
                return setFields(event.data);
            case "moveToField":
                const element = document.getElementById(`contza-${event.data.path.join(".")}`);
                if (!element) return;
                return window.scrollTo({
                    behavior: "smooth",
                    top: element.getBoundingClientRect().top + window.scrollY - 50,
                });
        }
    }, []);

    // Listen for visual editor edvents
    useEffect(() => {
        addEventListener("message", onEditorEvent);
        return () => removeEventListener("message", onEditorEvent);
    }, [onEditorEvent]);

    return (
        <ContentContext.Provider value={{ content, getField, setField }}>
            {contzaContext.editMode ? (
                <InteractionProvider>{props.children}</InteractionProvider>
            ) : (
                props.children
            )}
        </ContentContext.Provider>
    );
};
