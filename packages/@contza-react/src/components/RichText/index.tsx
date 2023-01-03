import { useContza } from "../../providers/ContzaProvider";
import React, { PropsWithChildren, ReactElement } from "react";
import RichTextRenderer from "./RichTextRenderer";
import useContzaFields from "../../hooks/useContzaFields";

export interface RichTextProps {
    children?: string;
    name?: string;
    placeholder?: string;
    components?: Partial<RichTextComponents>;
}

export interface RichTextComponents {
    p: (props: PropsWithChildren) => ReactElement;
    h1: (props: PropsWithChildren) => ReactElement;
    h2: (props: PropsWithChildren) => ReactElement;
    h3: (props: PropsWithChildren) => ReactElement;
    h4: (props: PropsWithChildren) => ReactElement;
    h5: (props: PropsWithChildren) => ReactElement;
    h6: (props: PropsWithChildren) => ReactElement;
    ul: (props: PropsWithChildren) => ReactElement;
    ol: (props: PropsWithChildren) => ReactElement;
    li: (props: PropsWithChildren) => ReactElement;
    img: (props: { src: string; alt: string }) => ReactElement;
    a: (props: { href: string; target: string } & PropsWithChildren) => ReactElement;
}

export const getRichText = (data: any, components: RichTextComponents) => {
    return (
        data?.content?.map((item: any, index: number) => {
            if (!item) return null;
            let element = <React.Fragment>{item.text}</React.Fragment>;
            if (!item.marks) return React.cloneElement(element, { key: index });
            const marks: string[] = item.marks.map(({ type }: any) => type);

            if (marks.includes("bold")) {
                element = <strong>{item.text}</strong>;
            }
            if (marks.includes("italic")) {
                element = <i>{item.text}</i>;
            }
            if (marks.includes("underline")) {
                element = <u>{item.text}</u>;
            }
            if (marks.includes("strike")) {
                element = <del>{item.text}</del>;
            }
            if (marks.includes("link")) {
                const link = item.marks.find(({ type }: any) => type === "link");
                element = components.a({
                    href: link.attrs.href,
                    target: link.attrs.target,
                    children: item.text,
                });
            }

            return React.cloneElement(element, { key: index });
        }) ?? null
    );
};

export const getRichHtml = (data: any, initialComponents: Partial<RichTextComponents> = {}) => {
    const components: RichTextComponents = {
        p: (props) => <p>{props.children}</p>,
        h1: (props) => <h1>{props.children}</h1>,
        h2: (props) => <h2>{props.children}</h2>,
        h3: (props) => <h3>{props.children}</h3>,
        h4: (props) => <h4>{props.children}</h4>,
        h5: (props) => <h5>{props.children}</h5>,
        h6: (props) => <h6>{props.children}</h6>,
        ul: (props) => <ul>{props.children}</ul>,
        ol: (props) => <ol>{props.children}</ol>,
        li: (props) => <li>{props.children}</li>,
        img: (props) => <img src={props.src} alt={props.alt} />,
        a: (props) => (
            <a href={props.href} target={props.target}>
                {props.children}
            </a>
        ),
        ...initialComponents,
    };

    return data.content.map((item: any, index: number) => {
        let element;
        switch (item.type) {
            case "paragraph":
                element = components.p({ children: getRichText(item, components) });
                break;
            case "heading":
                const children = getRichText(item, components);
                switch (item.attrs.level) {
                    case 1:
                        element = components.h1({ children });
                        break;
                    case 2:
                        element = components.h2({ children });
                        break;
                    case 3:
                        element = components.h3({ children });
                        break;
                    case 4:
                        element = components.h4({ children });
                        break;
                    case 5:
                        element = components.h5({ children });
                        break;
                    case 6:
                        element = components.h6({ children });
                        break;
                    default:
                        element = components.h1({ children });
                        break;
                }
                break;
            case "image":
                element = components.img({ src: item.attrs.src, alt: item.attrs.alt });
                break;
            case "bulletList":
                element = components.ul({ children: getRichHtml(item, components) });
                break;
            case "orderedList":
                element = components.ol({ children: getRichHtml(item, components) });
                break;
            case "listItem":
                element = components.li({ children: getRichHtml(item, components) });
                break;
            default:
                return null;
        }

        return React.cloneElement(element, { key: index });
    });
};

const EditableRichText = React.lazy(() => import("./EditableRichText"));

const RichText = (props: RichTextProps) => {
    const { children, name, components, placeholder = `Enter ${children ?? name}...` } = props;
    const fieldName = children ?? name;

    if (!fieldName) {
        throw new Error(
            "You must specify the name of the field by adding it to the 'children' or 'name' prop."
        );
    }

    const { editMode } = useContza();
    const { registerField } = useContzaFields();
    const { value } = registerField(fieldName, "richText", fieldName);

    if (!editMode && value === "") return <>{fieldName}</>;
    if (!editMode) return <RichTextRenderer content={value} components={components} />;

    return <EditableRichText name={fieldName} placeholder={placeholder} components={components} />;
};

export default RichText;
