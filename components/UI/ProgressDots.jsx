import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ProgressDots = ({ dotsCount, currentDot, baseUrl }) => {
    return (
        <div className="progress-dots">
            {[...Array(dotsCount).keys()].map(index => {
                return (
                    <Link
                        href={`${baseUrl}?index=${index}`}
                        className="btn__unset"
                    >
                        <span
                            className={`progress-dots__dot ${
                                !currentDot > num
                                    ? "progress-dots__dot-visited"
                                    : ""
                            }`}
                        ></span>
                    </Link>
                );
            })}
        </div>
    );
};

ProgressDots.propTypes = {
    dotsCount: PropTypes.number.isRequired,
    currentDot: PropTypes.number.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export default ProgressDots;
