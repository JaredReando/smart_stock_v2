import React from 'react';

import {withFirebase} from "../Firebase";
import AuthUserContext from "./context";

const withAuthProvider = Component => {

    class withAuthProvider extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                //on mount, saves and updates authUser to sessionStorage
                //listener catches if logout occurs, deletes authUser from storage
                authUser
                    ? sessionStorage.setItem("authUser", JSON.stringify(authUser))
                    : sessionStorage.removeItem("authUser");

                console.log("update from withAuthProvider")
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }
    return withFirebase(withAuthProvider)
};

export default withAuthProvider;
