import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '772763407841-sd01lcrp3eqgcsbo2ljcbq0kf8fti77p.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>Sign in status unknown</div>;
        } else if (this.state.isSignedIn) {
            return <div>Signed in</div>;
        } else {
            return <div>Not signed in</div>
        }
    };

    render() {
        return <div>{ this.renderAuthButton() }</div>
    };
}

export default GoogleAuth;