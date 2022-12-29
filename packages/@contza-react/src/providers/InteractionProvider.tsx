import React, { useCallback, useContext, useRef, useState } from "react";

interface InteractionOffset {
    top: number;
    left: number;
    width: number;
    height: number;
}

interface InteractionContext {
    resizeFocusBox: (target: EventTarget & HTMLSpanElement) => void;
    hideFocusBox: () => void;
    resizeHoverBox: (target: EventTarget & HTMLSpanElement) => void;
    hideHoverBox: () => void;
}

export const InteractionContext = React.createContext<InteractionContext>({
    resizeFocusBox: () => {},
    hideFocusBox: () => {},
    resizeHoverBox: () => {},
    hideHoverBox: () => {},
});

export const useInteraction = () => useContext(InteractionContext);

const offsetX = 6;
const offsetY = 5;
const defaultInteractionOffset: InteractionOffset = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
};

export const InteractionProvider = ({ children }: { children: React.ReactNode }) => {
    const focusBox = useRef<HTMLSpanElement>(null);
    const hoverBox = useRef<HTMLSpanElement>(null);

    const [showFocusBox, setShowFocusBox] = useState<boolean>(false);
    const [showHoverBox, setShowHoverBox] = useState<boolean>(false);
    const [focusBoxOffset, setFocusBoxOffset] =
        useState<InteractionOffset>(defaultInteractionOffset);
    const [hoverBoxOffset, setHoverBoxOffset] =
        useState<InteractionOffset>(defaultInteractionOffset);

    const resizeFocusBox = useCallback((target: EventTarget & HTMLSpanElement) => {
        setFocusBoxOffset({
            top: target.offsetTop,
            left: target.offsetLeft,
            width: target.offsetWidth,
            height: target.offsetHeight,
        });
        setShowFocusBox(true);
    }, []);

    const resizeHoverBox = useCallback((target: EventTarget & HTMLSpanElement) => {
        setHoverBoxOffset({
            top: target.offsetTop,
            left: target.offsetLeft,
            width: target.offsetWidth,
            height: target.offsetHeight,
        });
        setShowHoverBox(true);
    }, []);

    const hideFocusBox = useCallback(() => {
        setShowFocusBox(false);
    }, []);

    const hideHoverBox = useCallback(() => {
        setShowHoverBox(false);
    }, []);

    return (
        <InteractionContext.Provider
            value={{ resizeFocusBox, hideFocusBox, resizeHoverBox, hideHoverBox }}
        >
            <span
                ref={focusBox}
                style={{
                    visibility: showFocusBox ? "visible" : "hidden",

                    position: "absolute",
                    border: "2px solid black",
                    borderRadius: "5px",
                    pointerEvents: "none",

                    top: focusBoxOffset.top - offsetY,
                    left: focusBoxOffset.left - offsetX,
                    width: focusBoxOffset.width + offsetX * 2,
                    height: focusBoxOffset.height + offsetY * 2,
                }}
            />
            <span
                ref={hoverBox}
                style={{
                    visibility: showHoverBox ? "visible" : "hidden",

                    position: "absolute",
                    border: "2px solid black",
                    borderRadius: "5px",
                    pointerEvents: "none",

                    top: hoverBoxOffset.top - offsetY,
                    left: hoverBoxOffset.left - offsetX,
                    width: hoverBoxOffset.width + offsetX * 2,
                    height: hoverBoxOffset.height + offsetY * 2,
                }}
            />
            {children}
        </InteractionContext.Provider>
    );
};
