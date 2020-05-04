import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style1.css';

class Success extends Component {
    constructor(props) {
        super(props);
        const Selfie = localStorage.getItem('imgData');
        const Data = localStorage.getItem('data');
        const id_f = localStorage.getItem('imgId1');
        const id_b = localStorage.getItem('imgId2');
        const Data1 = JSON.parse(Data);
        const whichid = localStorage.getItem('whichid');
        this.state = {
            isComplete: Data1 && Selfie ? true : false,
            Selfie: Selfie,
            Data: Data1,
            id_f: id_f,
            id_b: id_b,
            whichid: whichid,
        };
    }
    myChangeHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('oksubmit', 'oksubmit');
        window.location.reload(false);
    };
    componentWillUpdate() {
        if (this.Data1 != null && this.Selfie != null) {
            this.setState({ isComplete: true });
        }
    }
    render() {
        console.log(this.state.isComplete);
        if (!this.state.isComplete) {
            return (
                <div className="Auth-container">
                    {alert('Details are pening\nPlease fill all the details ')}
                    <Redirect to="/auth"></Redirect>;
                </div>
            );
        } else {
            return (
                <div className="Auth-container" style={{ textAlign: 'center' }}>
                    <div style={{ marginTop: -20 }}>
                        <h3 style={{ color: 'green' }}>Confirmation Page</h3>
                        <div style={{ fontWeight: 'Bold', color: 'Gray' }}>
                            Please confirm your details
                        </div>
                        <div style={{ fontSize: 13, color: 'Gray' }}>
                            Navigation is enabled for editing purposes
                        </div>
                    </div>
                    {/* <Example data={this.state.Selfie} /> */}
                    <div>
                        <h5
                            style={{
                                color: 'green',
                                textDecoration: 'underline',
                            }}
                        >
                            User Details
                        </h5>
                    </div>
                    <div style={{ marginTop: -20 }}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <div
                                            style={{
                                                color: 'green',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Full Name
                                        </div>
                                    }
                                    secondary={
                                        <div
                                            style={{
                                                color: 'gray',
                                                textAlign: 'center',
                                                fontSize: 18,
                                            }}
                                        >
                                            {this.state.Data.details.firstName +
                                                ' ' +
                                                this.state.Data.details
                                                    .lastName}
                                        </div>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <div
                                            style={{
                                                color: 'green',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Gender
                                        </div>
                                    }
                                    secondary={
                                        <div
                                            style={{
                                                color: 'gray',
                                                textAlign: 'center',
                                                fontSize: 18,
                                            }}
                                        >
                                            {this.state.Data.details.gender}
                                        </div>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <div
                                            style={{
                                                color: 'green',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Date of Birth
                                        </div>
                                    }
                                    secondary={
                                        <div
                                            style={{
                                                color: 'gray',
                                                textAlign: 'center',
                                                fontSize: 18,
                                            }}
                                        >
                                            {parseInt(
                                                this.state.Data.details.date.slice(
                                                    8,
                                                    10
                                                )
                                            ) +
                                                1 +
                                                ' / ' +
                                                parseInt(
                                                    this.state.Data.details.date.slice(
                                                        5,
                                                        7
                                                    )
                                                ) +
                                                ' / ' +
                                                this.state.Data.details.date.slice(
                                                    0,
                                                    4
                                                )}
                                        </div>
                                    }
                                />
                            </ListItem>
                        </List>
                    </div>

                    <div>
                        <h5
                            style={{
                                color: 'green',
                                textDecoration: 'underline',
                            }}
                        >
                            Profile Photo
                        </h5>
                    </div>
                    <img
                        className="selpic_successpage"
                        src={`data:image/jpeg;base64,${this.state.Selfie}`}
                        alt="selpic_successpage"
                        style={{ marginLeft: -120, marginTop: 0 }}
                    />
                    <br></br>
                    <br></br>
                    <div style={{ marginTop: 220 }}>
                        <h5
                            style={{
                                color: 'green',
                                textDecoration: 'underline',
                            }}
                        >
                            Identity Card
                        </h5>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: 'green',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Selected Identity Card
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >
                                        {this.state.whichid}
                                    </div>
                                }
                            />
                        </ListItem>
                        <div style={{ color: 'green', padding: 15 }}>
                            Front Side
                        </div>
                    </div>
                    {/* <div className="header"> */}
                    <img
                        className="classid_f_succ"
                        src={`data:image/jpeg;base64,${this.state.id_f}`}
                        alt="classid_f_succ"
                        height="160"
                        width="260"
                        style={{ marginLeft: -129, marginTop: -10 }}
                    />
                    <div style={{ marginTop: 160 }}>
                        <div style={{ color: 'green', padding: 15 }}>
                            Back Side
                        </div>
                    </div>
                    <img
                        className="classid_b_succ"
                        src={`data:image/jpeg;base64,${this.state.id_b}`}
                        alt="classid_b_succ"
                        height="160"
                        width="260"
                        style={{ marginLeft: -129, marginTop: -10 }}
                    />
                    <div style={{ marginTop: 170, marginLeft: -20 }}>
                        <button
                            className="button_id_succ"
                            onClick={this.myChangeHandler}
                        >
                            <Link className="link1" to="/logout">
                                Save and Logout
                            </Link>
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default Success;
