import React from "react";

interface ListContext {
    name?: string;
    path: string[];
}

const ListContext = React.createContext<ListContext>({
    name: undefined,
    path: [],
});

interface ListProviderProps {
    name: string;
    path: string[];
    children: React.ReactNode;
}

export const ListProvider = (props: ListProviderProps) => {
    return (
        <ListContext.Provider value={{ name: props.name, path: props.path }}>
            {props.children}
        </ListContext.Provider>
    );
};

export const useList = () => React.useContext(ListContext);

interface ListItemContext {
    listKey: string;
    path: string[];
}

const ListItemContext = React.createContext<ListItemContext>({
    listKey: "",
    path: [],
});

interface ListItemProviderProps {
    listKey: string;
    path: string[];
    children: React.ReactNode;
}

export const ListItemProvider = (props: ListItemProviderProps) => {
    return (
        <ListItemContext.Provider value={{ listKey: props.listKey, path: props.path }}>
            {props.children}
        </ListItemContext.Provider>
    );
};

export const useListItem = () => React.useContext(ListItemContext);
