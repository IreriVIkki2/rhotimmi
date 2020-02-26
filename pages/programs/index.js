import React, { Component, Fragment } from "react";
import UserContext from "../../context/UserContext";
// import firebase from "firebase/app";
// import "firebase/firestore";
import fetch from "isomorphic-unfetch";
import Navbar from "../../components/Navbar";

export default class Index extends Component {
    static contextType = UserContext;

    static async getInitialProps() {
        const res = await fetch(
            "http://localhost:5000/rtmi-d1227/us-central1/api/v1/programs/all",
        );
        let data = await res.json();
        return { allPrograms: data };
    }

    constructor(props) {
        super(props);
        this.state = {
            allPrograms: this.props.allPrograms,
        };
    }

    componentDidMount() {
        console.log(this.state);
        if (this.context.user) {
            // const userPrograms = this.context.profile.purchases.programs;
        }
    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <h1>Programs page --</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci, dolorum nam facere laboriosam quibusdam quae? Sit
                    vero asperiores nobis eum et! Amet cum vero quibusdam quam
                    natus accusamus nobis? A.
                </p>
            </Fragment>
        );
    }
}
