import React, { Component } from "react";
import PropTypes from "prop-types";
import WorkOutDay from "./WorkOutDay";

export class FullProgram extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <WorkOutDay></WorkOutDay>
            </div>
        );
    }
}

export default FullProgram;
