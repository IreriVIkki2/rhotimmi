import React, { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import UserContext from "../context/UserContext";
import firebase, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "isomorphic-unfetch";
import clientCredentials from "../credentials/client";

export default class MyApp extends App {
    static async getInitialProps({ AppTree, Component, router, ctx }) {
        let childProps = null;
        if (Component.getInitialProps) {
            childProps = await Component.getInitialProps(ctx);
        }
        const profile = null;
        const user = null;
        return { user, profile, childProps };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            value: "",
            messages: this.props.messages,
            userLoaded: false,
        };

        this.removeProfileListener = this.removeProfileListener.bind(this);
        this.addProfileListener = this.addProfileListener.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        firebase.initializeApp(clientCredentials);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user, userLoaded: true });
                return user
                    .getIdToken()
                    .then(token => {
                        return fetch(
                            "http://localhost:5000/rtmi-d1227/us-central1/api/v1/login",
                            {
                                method: "POST",
                                headers: new Headers({
                                    "Content-Type": "application/json",
                                }),
                                credentials: "same-origin",
                                body: JSON.stringify({ token }),
                            },
                        );
                    })
                    .then(res => this.addProfileListener(this.state.user.uid));
            } else {
                this.setState({ user: null, userLoaded: true });
                fetch(
                    "http://localhost:5000/rtmi-d1227/us-central1/api/v1/logout",
                    {
                        method: "POST",
                        credentials: "same-origin",
                    },
                ).then(() => this.removeProfileListener());
            }
        });
    }

    render() {
        const { Component, pageProps, childProps } = this.props;

        return (
            <Fragment>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Quicksand:300,400,500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <UserContext.Provider
                    value={{
                        user: this.state.user,
                        profile: this.state.profile,
                        isAdmin: true,
                        signIn: this.handleLogin,
                        signOut: this.handleLogout,
                    }}
                >
                    {this.state.userLoaded && (
                        <Component {...pageProps} {...childProps} />
                    )}
                </UserContext.Provider>
            </Fragment>
        );
    }

    addProfileListener(uid) {
        // const db = firebase.firestore();
        let unsubscribeProfileListener = firestore()
            .collection("profiles")
            .onSnapshot(
                querySnapshot => {
                    var profile = {};
                    querySnapshot.forEach(function(doc) {
                        if (doc.id === uid) {
                            profile = { ...doc.data() };
                        }
                    });
                    if (profile) this.setState({ profile });
                },
                error => {
                    console.error(error);
                },
            );

        this.setState({ unsubscribeProfileListener, profileLoaded: true });
    }

    removeProfileListener() {
        // firebase.database().ref('profile').off()
        if (this.state.unsubscribeProfileListener) {
            this.state.unsubscribeProfileListener();
        }
    }

    handleLogin() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    handleLogout() {
        firebase.auth().signOut();
    }
}
