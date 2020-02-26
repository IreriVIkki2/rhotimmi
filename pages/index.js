import React, { Component, Fragment } from "react";
import UserContext from "../context/UserContext";
import firebase, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "isomorphic-unfetch";
import Navbar from "../components/Navbar";

export default class Index extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(this.context);
    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <h1>This is the home page</h1>
            </Fragment>
        );
    }
}
