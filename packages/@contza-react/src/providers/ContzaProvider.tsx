import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ContzaClient, ContzaContent } from "@contza/client";
import { CONTZA_PRODUCTION_URL } from "../utils";
import { ContzaEditorEvent } from "../types";

interface ContzaContext {
    editMode: boolean;
    sendEditorEvent: (event: ContzaEditorEvent) => any;
    initialContents: ContzaContent[];
    contzaClient: ContzaClient;
    contzaUrl: string;
}

// Create a React context for Contza
export const ContzaContext = React.createContext<ContzaContext>({} as ContzaContext);

// Custom hook to access the ContzaContext
export const useContza = () => useContext(ContzaContext);

interface ContzaProviderProps {
    children: React.ReactNode;

    // Contza websiteId
    websiteId: string;

    // Initial contents are shared down to ContentProvider components
    initialContents?: ContzaContent[];

    // Contza URL is only used for development purposes
    contzaUrl?: string;
}

// ContzaProvider component that wraps the application and provides context
export const ContzaProvider = (props: ContzaProviderProps) => {
    // Determine the Contza URL
    const contzaUrl = props.contzaUrl ?? CONTZA_PRODUCTION_URL;

    // Store initialized ContzaClient to a reference.
    // The API handles the requests differently when the apiKey is "client"
    const contzaClient = useRef<ContzaClient>(
        new ContzaClient(props.websiteId, "client", { contzaUrl })
    );

    // State to track edit mode
    const [editMode, setEditMode] = useState<boolean>(false);

    // Function to send editor events to the parent window
    const sendEditorEvent = useCallback(
        (event: ContzaEditorEvent) => {
            if (!editMode) return;
            window.parent.postMessage(
                { url: window.location.href.toString(), ...event } as ContzaEditorEvent,
                contzaUrl
            );
        },
        [contzaUrl, editMode]
    );

    // Listen for visual editor initialization
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const editMode =
            (query.get("contza-editmode") as string) ?? sessionStorage.getItem("contza-editmode");

        if (!editMode) return;

        // Send onLoad editor event to the parent window
        window.parent.postMessage({ type: "onLoad" }, contzaUrl);

        // Store edit mode in session storage and update the state
        sessionStorage.setItem("contza-editmode", "true");
        setEditMode(true);
    }, [contzaUrl, props.contzaUrl]);

    // Provide the ContzaContext to child components
    return (
        <ContzaContext.Provider
            value={{
                editMode,
                sendEditorEvent,
                initialContents: props.initialContents ?? [],
                contzaClient: contzaClient.current,
                contzaUrl,
            }}
        >
            {props.children}
        </ContzaContext.Provider>
    );
};
