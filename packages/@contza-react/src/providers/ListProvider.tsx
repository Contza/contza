import React, { createContext, ReactNode, useContext } from "react";

interface ListContext {
    name?: string;
    path: string[];
}

const ListContext = createContext<ListContext>({
    name: undefined,
    path: [],
});

interface ListProviderProps {
    name: string;
    path: string[];
    children: ReactNode;
}

export const ListProvider = (props: ListProviderProps) => {
    return (
        <ListContext.Provider value={{ name: props.name, path: props.path }}>
            {props.children}
        </ListContext.Provider>
    );
};

export const useList = () => useContext(ListContext);

interface ListItemContext {
    listKey: string;
    path: string[];
}

const ListItemContext = createContext<ListItemContext>({
    listKey: "",
    path: [],
});

interface ListItemProviderProps {
    listKey: string;
    path: string[];
    children: ReactNode;
}

export const ListItemProvider = (props: ListItemProviderProps) => {
    return (
        <ListItemContext.Provider value={{ listKey: props.listKey, path: props.path }}>
            {props.children}
        </ListItemContext.Provider>
    );
};

export const useListItem = () => useContext(ListItemContext);
