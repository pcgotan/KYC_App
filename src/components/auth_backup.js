import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style1.css';
import axios from 'axios';
// import { createStore, combineReducers } from 'redux';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        let loggedin = true;
        if (token == null) {
            loggedin = false;
        }
        this.state = {
            arr: {},
            json_len: -1,
            loggedin,
            cnt: 1,
            cli: 1,
            details: { firstName: '', lastName: '', age: null },
        };
        this.hancli = this.hancli.bind(this);
    }
    componentWillMount() {
        const data = localStorage.getItem('data');
        if (data) {
            this.setState(JSON.parse(data));
        }
    }

    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state));
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let nam = this.state.firstName;
        let nam2 = this.state.lastName;
        let age = this.state.age;
        let cnt = this.state.cnt;

        if (!Number(age)) {
            alert('Your age must be a number');
        }
        if (!nam) {
            alert('Please enter your first name');
        }
        if (!nam2) {
            alert('Please enter your last name');
        }
        if (Number(age) && nam && nam2 && cnt === 1) {
            this.setState({ cnt: 2 });

            axios.post('http://localhost:3333/users/', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
            });
            console.log(this.state.json_len);
            axios.get('http://localhost:3333/users/').then((res) => {
                this.setState({ json_len: res.data.length });
            });
        }

        if (Number(age) && nam && nam2 && cnt === 2) {
            // console.log(this.state.json_len);
            axios.put(
                'http://localhost:3333/users/' + (this.state.json_len + 1),
                {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    age: this.state.age,
                }
            );
            this.setState({ cnt: 2 });
        }
    };
    hancli() {
        let cli = this.state.cli;
        cli = cli + 1;
        this.setState({ cli: cli });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        // console.log(event.target.value);
        // let newState = Object.assign({}, this.state);
        // if (nam === 'firstName') {
        //     newState.firstName = val;
        // }
        this.setState({ [nam]: val });
    };
    render() {
        // console.log(this.state.age);
        if (this.state.loggedin === false) {
            return <Redirect to="/"></Redirect>;
        }

        return (
            <React.Fragment>
                <div className="Auth-container">
                    <form onSubmit={this.mySubmitHandler}>
                        <p>First Name:</p>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Prashant"
                            onChange={this.myChangeHandler}
                            // value={this.state.details.firstName}
                        />
                        <br></br>
                        <br></br>
                        <p>Last Name:</p>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Chouhan"
                            onChange={this.myChangeHandler}
                            // value={this.state.details.lastName}
                        />
                        <br></br>
                        <br></br>
                        <p>Age:</p>
                        <input
                            type="text"
                            name="age"
                            placeholder="21"
                            onChange={this.myChangeHandler}
                            // value={this.state.details.age}
                        />
                        <br />
                        <br />

                        <button>Submit</button>
                    </form>

                    <div>
                        <button onClick={(e) => this.hancli(e)}>
                            {this.state.cli}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
