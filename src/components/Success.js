import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import './style1.css';

class Success extends Component {
    constructor(props) {
        super(props);
        const Selfie = localStorage.getItem('imgData');
        const Data = localStorage.getItem('data');
        const id_f = localStorage.getItem('imgId1');
        const id_b = localStorage.getItem('imgId2');
        const Data1 = JSON.parse(Data);
        this.state = {
            isComplete: Data1 && Selfie ? true : false,
            Selfie: Selfie,
            Data: Data1,
            id_f: id_f,
            id_b: id_b,
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
                        <h6>Please confirm your details</h6>
                        <>Navigation is enabled for editing purposes</>
                    </div>
                    {/* <Example data={this.state.Selfie} /> */}
                    <TextField
                        id="standard-basic"
                        label="Full name"
                        value={
                            this.state.Data.details.firstName +
                            ' ' +
                            this.state.Data.details.lastName
                        }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        id="standard-basic"
                        label="Date of Birth"
                        value={
                            parseInt(
                                this.state.Data.details.date.slice(8, 10)
                            ) +
                            1 +
                            ' / ' +
                            parseInt(this.state.Data.details.date.slice(5, 7)) +
                            ' / ' +
                            this.state.Data.details.date.slice(0, 4)
                        }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        id="standard-basic"
                        label="Gender"
                        value={this.state.Data.details.gender}
                    />
                    <br></br>
                    <br></br>
                    <div>
                        <h5>Profile Photo</h5>
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
                        <h5>Id Photos</h5>
                        <h6>Front</h6>
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
                        <h6>Back</h6>
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
