import React, { useCallback, useContext, useEffect, useState } from "react";
import { useContza } from "./ContzaProvider";
import { InteractionProvider } from "./InteractionProvider";
import { ContzaContentField, ContzaContentFieldType, ContzaEditorEvent } from "../types";
import { ContzaContent } from "@contza/client";

interface ContentContext {
    content?: ContzaContent;
    getField: (fieldPath: string[]) => ContzaContentField | undefined;
    setField: (fieldPath: string[], type: ContzaContentFieldType, value: any) => void;
}

export const ContentContext = React.createContext<ContentContext>({} as ContentContext);

interface ContentProviderProps {
    slug: string;
    locale?: string;
    initialContent?: ContzaContent;
    children: React.ReactNode;
}

export const useContent = () => useContext(ContentContext);

export const ContentProvider = (props: ContentProviderProps) => {
    const contzaContext = useContza();

    // Find defaultContent from prop or from contzaContext initialContents
    const defaultContent: ContzaContent | undefined =
        props.initialContent ??
        contzaContext.initialContents.find((content) =>
            content.slug === props.slug && content.locale === props.locale && props.locale
                ? content.locale === props.locale
                : true
        );

    // Define content locale
    const locale = props.locale ?? defaultContent?.locale;

    // Throw an error if the prop and default content locales do not match
    if (!!props.locale && !!defaultContent && props.locale !== defaultContent.locale) {
        throw `@contza/react - <ContentProvider slug="${props.slug}" /> 'locale' prop should match as the initial content's locale.`;
    }

    const [content, setContent] = useState<ContzaContent | undefined>(defaultContent);
    const [fields, setFields] = useState<Record<string, any>>(defaultContent?.data ?? {});

    const getField = (fieldPath: string[]): ContzaContentField | undefined => {
        return fields[fieldPath.join(".")];
    };

    const setField = (fieldPath: string[], type: ContzaContentFieldType, value: any): void => {
        setFields((oldFields) => ({ ...oldFields, [fieldPath.join(".")]: { type, value } }));
    };

    // Function for sending initial editor events.
    const sendInitialEditorEvents = useCallback(
        (content: ContzaContent) => {
            contzaContext.sendEditorEvent({
                type: "onNavigation",
                data: { url: window.location.href.toString() },
            });
            contzaContext.sendEditorEvent({
                type: "onContent",
                contentEntryId: content.id,
                data: content,
            });
        },
        [contzaContext]
    );

    const getContentFromApi = useCallback(() => {
        contzaContext.contzaClient.findOne(props.slug, { locale }).then((content) => {
            setContent(content);
            setFields(content.data);
            sendInitialEditorEvents(content);
        });
    }, [contzaContext.contzaClient, locale, props.slug, sendInitialEditorEvents]);

    // Fetch content from API if the user is on edit mode or the default content is not defined
    useEffect(() => {
        if (contzaContext.editMode || !defaultContent) {
            contzaContext.contzaClient.findOne(props.slug, { locale }).then((content) => {
                setContent(content);
                setFields(content.data);
                sendInitialEditorEvents(content);
            });
        }
    }, [
        contzaContext.contzaClient,
        contzaContext.editMode,
        defaultContent,
        locale,
        props.slug,
        sendInitialEditorEvents,
    ]);

    // Handle defaultContent changes
    useEffect(() => {
        // Do nothing, if the user is not in edit mode
        if (!contzaContext.editMode) return;

        // Do nothing, if the defaultContent is empt
        if (!defaultContent) return;

        // Update the content state and send initial editor events
        setContent(defaultContent);
        sendInitialEditorEvents(defaultContent);
    }, [defaultContent, contzaContext.editMode, contzaContext, sendInitialEditorEvents]);

    // Send onFields editor event when ever field or content is updated
    useEffect(() => {
        if (!content) return;

        contzaContext.sendEditorEvent({
            type: "onFields",
            contentEntryId: content.id,
            data: fields,
        });
    }, [fields, content, contzaContext]);

    const onEditorEvent = useCallback(
        (e: MessageEvent) => {
            const event: ContzaEditorEvent = e.data;

            // Do not receive any editor events when content is not defined
            if (!content) return;

            // Make sure the messages is coming from correct url
            if (e.origin !== contzaContext.contzaUrl) return;

            // Make sure the message is related to the content defined in this component's state
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
        },
        [content, contzaContext.contzaUrl]
    );

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
