import React, { Component } from "react";
import UserContext from "../context/UserContext";
import Link from "next/link";

export class Navbar extends Component {
    static contextType = UserContext;
    render() {
        const { user, signIn, signOut } = this.context;
        return (
            <nav className="navbar">
                <h1>Rhotimmi</h1>
                {this.context.user && (
                    <div style={{ display: "flex" }}>
                        <div>
                            <Link href="/">
                                <img
                                    src="https://picsum.photos/50/50.jpg"
                                    alt=""
                                />
                            </Link>
                        </div>
                        <ul
                            className=""
                            style={{ display: "flex", listStyle: "none" }}
                        >
                            <li className="">{user.displayName}</li>

                            <li className="">
                                <Link href="/">
                                    <span>Notifications</span>
                                </Link>
                            </li>
                            <li className="">
                                <Link href="/programs">
                                    <span>Programs</span>
                                </Link>
                            </li>
                            <li className="">
                                <Link href="/">
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li className="">
                                <button onClick={signOut} className="btn-txt">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {!user && <button onClick={signIn}>Login</button>}
            </nav>
        );
    }
}

export default Navbar;
