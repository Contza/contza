import { ContzaEditorEvent } from "../types";
import { contzaUrl } from "../utils";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface ContzaContext {
    editMode: boolean;
    sendEditorEvent: (event: ContzaEditorEvent) => any;
}

export const ContzaContext = React.createContext<ContzaContext>({
    editMode: false,
    sendEditorEvent: () => {},
});

export const useContza = () => useContext(ContzaContext);

interface ContzaProviderProps {
    children: React.ReactNode;
    // Contza URL is only used for development purposes
    contzaUrl?: string;
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
            }}
        >
            {children}
        </ContzaContext.Provider>
    );
};
