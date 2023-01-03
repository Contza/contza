import React from "react";
import { ListItemProvider, ListProvider, useList, useListItem } from "../../providers/ListProvider";
import useContzaFields from "../../hooks/useContzaFields";

interface ListProps extends Omit<Partial<React.HTMLAttributes<HTMLElement>>, "children"> {
    name: string;
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const List = (props: ListProps) => {
    const { name, as: Element = React.Fragment, children, ...otherProps } = props;

    const parentList = useList();
    const { registerField } = useContzaFields();
    const { value } = registerField(name, "list");

    return (
        <ListProvider name={name} path={[...parentList.path, name]}>
            <Element {...otherProps}>
                {value.map((listKey: string) => {
                    return (
                        <ListItem key={listKey} listName={name} listKey={listKey}>
                            {children}
                        </ListItem>
                    );
                })}
            </Element>
        </ListProvider>
    );
};

interface ListItemProps {
    listName: string;
    listKey: string;
    children: React.ReactNode;
}

const ListItem = (props: ListItemProps) => {
    const { listName, listKey, children } = props;
    const parentListItem = useListItem();

    return (
        <ListItemProvider
            key={listKey}
            listKey={listKey}
            path={[...parentListItem.path, listName, "value", listKey]}
        >
            {children}
        </ListItemProvider>
    );
};

export default List;
