import React, { useEffect } from "react";
import "./Blink.css";

function Blink({ text: textFromParent }) {
    const spanRef = React.createRef();

    useEffect(() => {
        if (typeof textFromParent !== "string")
            throw new Error(
                `Blink component expects a string for the text prop, got ${textFromParent}`
            );
        const span = spanRef.current;
        span.classList.add("animate");
        setTimeout(() => {
            span.classList.remove("animate");
        }, 600);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textFromParent]);

    return (
        <span ref={spanRef} className="Blink">
            {textFromParent}
        </span>
    );
}

export default Blink;
