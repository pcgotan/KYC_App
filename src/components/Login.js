import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import logo from '../logo.svg';
import { Button, Form } from 'reactstrap';
import './style.scss';
import './style1.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        let loggedin = true;
        if (token == null) {
            loggedin = false;
        }
        this.state = {
            username: '',
            password: '',
            loggedin,
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submitForm(e) {
        e.preventDefault();
        const { username, password } = this.state;
        if (
            (username === 'admin' && password === 'admin') ||
            (username === 'user' && password === 'pass')
        ) {
            localStorage.setItem('token', 'asadsfaddf');
            localStorage.removeItem('oksubmit');
            this.setState({
                loggedin: true,
            });
        } else alert('wrong username or password');
    }
    render() {
        if (this.state.loggedin) {
            return <Redirect to="/auth"></Redirect>;
        }
        return (
            <React.Fragment>
                <div className="text-center">
                    <img
                        className="logoo"
                        src={logo}
                        style={{ height: 135 }}
                        alt="logoo"
                    ></img>
                    <h3 className="title-zest">Hola! Bienvenida a Zestmoney</h3>
                    <h5>KYC solution</h5>
                    <Form className="login-form" onSubmit={this.submitForm}>
                        <TextField
                            // required
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            id="outlined-required"
                            label="Username"
                            // defaultValue="Hello World"
                            variant="outlined"
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            id="outlined-required"
                            label="Password"
                            // defaultValue="Hello World"
                            variant="outlined"
                        />
                        <br></br>
                        <br></br>
                        <Button className="sub-btn1">Get OTP</Button>
                        {/* <input type="submit"></input> */}
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}
