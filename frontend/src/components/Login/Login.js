import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        // Inherit Constructor
        super(props);

        // Component State Setup
        this.state = {

        };

        // Bind Functions
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }

    componentWillMount() {
        this.isComponentMounted = false;
    }

    render() {
        return (
            <label>Login</label>
        )
    }
}

export default Login;