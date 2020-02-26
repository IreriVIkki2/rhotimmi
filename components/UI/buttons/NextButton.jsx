import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const NextButton = ({ url }) => {
    return (
        <Link
            href={url}
            id="next-button"
            className="btn btn__next btn__secondary"
        >
            next
        </Link>
    );
};

NextButton.PropTypes = {
    url: PropTypes.string.isRequired,
};

export default NextButton;
