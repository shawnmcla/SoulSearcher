import { useEffect, useState, type ElementType } from "react";

interface RevealContainerProps {
    active: boolean;
    children: React.ReactNode;
    className?: string; // Optional extra classes
    as?: ElementType
}

export function RevealContainer({
    active,
    children,
    className = "",
    as: Tag = "div"
}: RevealContainerProps) {
    const [isVisible, setIsVisible] = useState<boolean>(active);
    const [isExpanded, setIsExpanded] = useState<boolean>(active);

    useEffect(() => {
        if (active) {
            setIsVisible(true);
            setIsExpanded(false);
            setTimeout(() =>
                requestAnimationFrame(() => {
                    setIsExpanded(true);
                }), 0);
        } else {
            setIsExpanded(false);
        }
    }, [active]);

    return (
        <Tag
            className={`reveal-container ${isExpanded ? "active" : ""} ${className}`}
            style={{ display: !isVisible ? "none" : undefined }}
            onTransitionEnd={() => {
                if (!isExpanded) {
                    setIsVisible(false);
                }
            }}
        >
            {children}
        </Tag>
    );
}