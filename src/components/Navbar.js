import anime from 'animejs';
import React from 'react';
import * as Icon from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import './style1.css';
import '../app1.css';
import thanklogo from '../thanklogo.svg';
function Navbar({ pages, darkMode, setDarkMode }) {
    const token = localStorage.getItem('token');
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const imgData = localStorage.getItem('imgData');
    const Data = localStorage.getItem('data');
    const id_f = localStorage.getItem('imgId1');
    const id_b = localStorage.getItem('imgId2');
    function refreshPage() {
        window.location.reload(false);
    }
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        return (
            <>
                <div className="Navbar">
                    <div
                        className="navbar-left"
                        onClick={(darkMode) =>
                            setDarkMode((prevMode) => !prevMode)
                        }
                        onMouseEnter={() => {
                            if (window.innerWidth > 50) {
                                anime({
                                    targets: '.navbar-left path',
                                    strokeDashoffset: [anime.setDashoffset, 0],
                                    easing: 'easeInOutSine',
                                    duration: 150,
                                    delay: function (el, i) {
                                        return i * 10;
                                    },
                                    direction: 'alternate',
                                    loop: false,
                                });
                            }
                        }}
                    >
                        {window.innerWidth > 50 && (
                            <React.Fragment>
                                <span>
                                    {darkMode ? (
                                        <Icon.Sun color={'#ffc107'} />
                                    ) : (
                                        <Icon.Moon />
                                    )}
                                </span>
                            </React.Fragment>
                        )}
                    </div>

                    <div className="navbar-middle">
                        <span>
                            <Link to="/auth">
                                <img
                                    src={thanklogo}
                                    style={{
                                        height: 60,
                                    }}
                                    alt="Logo"
                                ></img>
                            </Link>
                        </span>
                    </div>
                    <div
                        className="navbar-right"
                        onClick={() => {}}
                        onMouseEnter={() => {
                            if (window.innerWidth > 50) {
                                anime({
                                    targets: '.navbar-right path',
                                    strokeDashoffset: [anime.setDashoffset, 0],
                                    easing: 'easeInOutSine',
                                    duration: 450,
                                    delay: function (el, i) {
                                        return i * 250;
                                    },
                                    direction: 'alternate',
                                    loop: false,
                                });
                            }
                        }}
                    >
                        {window.innerWidth > 50 && (
                            <React.Fragment>
                                <span>
                                    <Link to="/auth">
                                        <Icon.Edit />
                                    </Link>
                                </span>
                                <span>
                                    <Link
                                        to="/selfie"
                                        onClick={
                                            imgData
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.Camera />
                                    </Link>
                                </span>
                                <span>
                                    <Link
                                        to="/govtid"
                                        onClick={
                                            id_f && id_b
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.CreditCard />
                                    </Link>
                                </span>
                                <span>
                                    <Link
                                        to="/success"
                                        onClick={
                                            id_f && id_b && Data
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.UserCheck />
                                    </Link>
                                </span>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <span>
                                    <Link to="/logout" onClick={refreshPage}>
                                        <Icon.LogOut></Icon.LogOut>
                                    </Link>
                                </span>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <br></br>
                <br></br>
            </>
        );
    }
}

export default Navbar;
