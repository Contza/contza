import { ContzaEditorEvent } from "../types";
import { contzaUrl } from "../utils";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface ContzaContext {
    editMode: boolean;
    sendEditorEvent: (event: ContzaEditorEvent) => any;
    contzaUrl: string;
}

export const ContzaContext = React.createContext<ContzaContext>({
    editMode: false,
    sendEditorEvent: () => {},
    contzaUrl: contzaUrl,
});

export const useContza = () => useContext(ContzaContext);

interface ContzaProviderProps {
    children: React.ReactNode;
    contzaUrl?: string; // Contza URL is only used for development purposes
}

export const ContzaProvider = (props: ContzaProviderProps) => {
    const { children } = props;

    const [editMode, setEditMode] = useState<boolean>(false);

    const sendEditorEvent = useCallback(
        (event: ContzaEditorEvent) => {
            if (!editMode) return;
            window.parent.postMessage(event, props.contzaUrl ?? contzaUrl);
        },
        [editMode]
    );

    // Listen for visual editor initalization
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const editMode =
            (query.get("contza-editmode") as string) ?? sessionStorage.getItem("contza-editmode");

        if (!editMode) return;

        sessionStorage.setItem("contza-editmode", "true");
        setEditMode(true);
    }, []);

    return (
        <ContzaContext.Provider
            value={{
                editMode,
                sendEditorEvent,
                contzaUrl: props.contzaUrl ?? contzaUrl,
            }}
        >
            {children}
        </ContzaContext.Provider>
    );
};
