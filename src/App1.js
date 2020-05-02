import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { useLocalStorage } from 'react-use';
// import logo from './logo.svg';
import './components/style.scss';
import './components/style1.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { transitions, positions, Provider } from 'react-alert';
import { useAlert } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Auth from './components/Auth';
import Selfie from './components/Selfie';
import Govtid from './components/Govtid';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Success from './components/Success';
import Alertt from './Alertt';
const os = require('os');
const options = {
    timeout: 10000,
    position: positions.MIDDLE,
    transition: transitions.SCALE,
};

function App1() {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
    const temp = os.release();
    var temp1 = '';
    for (let i = 0; i < temp.length; i++) {
        for (let j = i + 1; j < temp.length; j++) {
            if (
                temp.slice(i, j) === 'Mobile' ||
                temp.slice(i, j) === 'mobile'
            ) {
                temp1 = temp.slice(i, j);
            }
        }
    }
    React.useEffect(() => {
        if (darkMode) {
            document.querySelector('body').classList.add('dark-mode');
        } else {
            document.querySelector('body').classList.remove('dark-mode');
        }
    }, [darkMode]);
    if (temp1.toLowerCase() !== 'mobile') {
        localStorage.removeItem('token');
        return (
            <Provider template={AlertTemplate} {...options}>
                <Alertt></Alertt>
            </Provider>
        );
    } else {
        const pages = [
            {
                pageLink: '/auth',
                view: Auth,
                displayName: 'Home',
                animationDelayForNavbar: 0.2,
                showInNavbar: true,
            },
            {
                pageLink: '/selfie',
                view: Selfie,
                displayName: 'Selfie',
                animationDelayForNavbar: 0.2,
                showInNavbar: true,
            },
            {
                pageLink: '/govtid',
                view: Govtid,
                displayName: 'Govt id',
                animationDelayForNavbar: 0.2,
                showInNavbar: true,
            },
            {
                pageLink: '/success',
                view: Success,
                displayName: 'Success??',
                animationDelayForNavbar: 0.2,
                showInNavbar: true,
            },
            {
                pageLink: '/logout',
                view: Logout,
                displayName: 'logout',
                animationDelayForNavbar: 0.2,
                showInNavbar: true,
            },
        ];

        return (
            <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
                <Router>
                    <Route
                        render={({ location }) => (
                            <div className="Almighty-Router">
                                <Navbar
                                    pages={pages}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />
                                <Switch location={location}>
                                    {pages.map((page, index) => {
                                        return (
                                            <Route
                                                exact
                                                path={page.pageLink}
                                                component={page.view}
                                                key={index}
                                            />
                                        );
                                    })}
                                    <Redirect to="/" />
                                </Switch>
                            </div>
                        )}
                    />
                </Router>
            </div>
        );
    }
}

export default class App2 extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        let loggedin = true;
        if (token == null) {
            loggedin = false;
        }
        this.state = {
            loggedin,
        };
    }
    render() {
        if (this.state.loggedin === false) {
            return <Redirect to="/"></Redirect>;
        } else {
            return <App1></App1>;
        }
    }
}
