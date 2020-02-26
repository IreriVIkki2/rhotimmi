import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ProgressDots from "../UI/ProgressDots";
import Routine from "../containers/Routine";
import NextButton from "../UI/buttons/NextButton";
import BackButton from "../UI/buttons/BackButton";

export class WorkOutDay extends Component {
    static propTypes = {
        programTitle: PropTypes.string.isRequired,
        workOutDayCount: PropTypes.number.isRequired,
        exercises: PropTypes.array.isRequired,
    };

    render() {
        const { programTitle, workOutDayCount, exercises } = this.props;
        const userProgress = {};
        const currentRoutine = exercises.find(
            exe => exe._id === userProgress.currentExercise,
        );
        const baseUrl = "#";

        return (
            <div className="">
                <h2 className="heading__md">{programTitle}</h2>
                <div className="sub-heading">
                    <span className="workout-day__day-count">
                        {workOutDayCount}
                    </span>
                    <small>{moment.now()}</small>
                </div>
                <div>
                    <span>60% complete</span>
                </div>
                <ProgressDots
                    currentDot={0}
                    baseUrl={baseUrl}
                    dotsCount={exercises.length}
                ></ProgressDots>
                <Routine
                    routineId={currentRoutine._id}
                    routineTitle={currentRoutine.title}
                    routineDescription={currentRoutine.description}
                    youtubeId={currentRoutine.youtubeId}
                ></Routine>
                <div className="workout-day__navigation">
                    <NextButton
                        url={`${baseUrl}?index=${index + 1}`}
                    ></NextButton>
                    <BackButton
                        url={`${baseUrl}?index=${index - 1}`}
                    ></BackButton>
                </div>
            </div>
        );
    }
}

export default WorkOutDay;
