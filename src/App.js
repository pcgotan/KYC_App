import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'react-dropdown/style.css';
import './components/style.scss';
import './components/style1.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Thanks from './components/Thanks';
import App2 from './App1';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/auth" component={App2}></Route>
                <Route path="/thanks" component={Thanks}></Route>
                <App2></App2>
            </Switch>
        );
    }
}

export default App;
