import * as React from "react";
import { ListItemProvider, ListProvider, useList, useListItem } from "../../providers/ListProvider";
import useContzaFields from "../../hooks/useContzaFields";

type ListFunction = (listKey: string, index: number) => React.ReactNode | Element;

interface ListProps extends Omit<Partial<React.HTMLAttributes<HTMLElement>>, "children"> {
    name: string;
    children: React.ReactNode | ListFunction;
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const List = (props: ListProps) => {
    const { name, as: Element = React.Fragment, children, ...otherProps } = props;

    const parentList = useList();
    const { registerField } = useContzaFields();
    const { value = [] } = registerField(name, "list");

    const isFunction = children instanceof Function;

    return (
        <ListProvider name={name} path={[...parentList.path, name]}>
            <Element {...otherProps}>
                {value.map((listKey: string, index: number) => {
                    return (
                        <ListItem key={listKey} listName={name} listKey={listKey}>
                            {isFunction ? (children(listKey, index) as React.ReactNode) : children}
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
