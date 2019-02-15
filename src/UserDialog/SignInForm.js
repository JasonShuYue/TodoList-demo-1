import React, { Component } from 'react';

import './SignInForm.css';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onDataChange(e, type) {
        let {onDataChange} = this.props;
        let value = e.target.value;
        onDataChange(value, type)
    }

    render() {
        return(
            <div className="SignInForm">
                <div className="input-wrapper">
                    <svg className="icon icon-user" aria-hidden="true">
                        <use xlinkHref={`#icon-user`}></use>
                    </svg>
                    <input type="text" placeholder={'Username'} onChange={(e) => this.onDataChange(e, 'username')} />
                </div>

                <div className="input-wrapper">
                    <svg className="icon icon-password" aria-hidden="true">
                        <use xlinkHref={`#icon-password`}></use>
                    </svg>
                    <input type="password" placeholder={'Password'} onChange={(e) => this.onDataChange(e, 'username')} />
                </div>
                <button className="signin-button">Sign In</button>
            </div>
        );
    }
}

export default SignInForm;