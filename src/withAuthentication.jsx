import React from 'react';

import AuthUserContext from "./AuthUserContext";
import { firebase, auth } from "./firebase/index";

const withAuthentication = (Component) => {
    
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)
    
            this.state = {
                authUser: null,
            }
        }
    
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.loadUserData(authUser)
                    : this.setState(() => ({ authUser: null }));
            });
        }
        
        loadUserData = (authUser) => {
            new Promise((resolve) => resolve(auth.getUserData()))
                .then(() => this.setState(() => ({ authUser })))
        }

        render() {
            const { authUser } = this.state;

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>                
            );
        }
    }

    return WithAuthentication;

}

export default withAuthentication;