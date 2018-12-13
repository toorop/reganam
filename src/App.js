import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from '../src/containers/Home'

import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Home/>
            </React.Fragment>
        );
    }
}

export default App;
