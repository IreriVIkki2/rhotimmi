import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../UI/VideoPlayer";

const Routine = ({
    routineTitle,
    routineDescription,
    youtubeId,
    routineId,
}) => {
    return (
        <div id={routineId} className="card__sm">
            <h3 className="heading__sm routine__heading">{routineTitle}</h3>
            <VideoPlayer youtubeId={youtubeId}></VideoPlayer>
            <p id="routine__description">{routineDescription}</p>
        </div>
    );
};

Routine.propTypes = {
    youtubeId: PropTypes.string.isRequired,
    routineTitle: PropTypes.string.isRequired,
    routineDescription: PropTypes.string.isRequired,
};

export default Routine;
