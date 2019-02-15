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

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        let { error } = this.props;
        return(
            <div className="SignInForm">
                <form className="signIn-form" onSubmit={(e) => this.onSubmit(e)}>
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
                        <input type="password" placeholder={'Password'} onChange={(e) => this.onDataChange(e, 'password')} />
                    </div>
                    {
                        error && <p className="tips">{error}</p>
                    }
                    <button className="signIn-button">Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignInForm;