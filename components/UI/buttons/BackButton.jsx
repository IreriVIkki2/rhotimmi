import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const BackButton = ({ url }) => {
    return (
        <Link
            href={url}
            id="back-button"
            className="btn btn__back btn__secondary"
        >
            back
        </Link>
    );
};

BackButton.PropTypes = {
    url: PropTypes.string.isRequired,
};

export default BackButton;
