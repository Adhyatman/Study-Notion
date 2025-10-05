import React from "react";

const HighlightText = ({ text }) => {
    return (
        <span className="font-bold bg-gradient-to-b from-blue-200 via-blue-100 to-blue-5 bg-clip-text text-transparent"> {`${text}`} </span>
    );
};

export default HighlightText;
