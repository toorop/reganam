import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Provider} from 'react-redux'
import store from './redux/store'

import Snackbar from './components/Snackbar'

import Home from '../src/containers/Home'

import './App.css';
import Loader from "./components/Loader"

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CssBaseline/>
                <Loader/>
                <Snackbar/>
                <Home/>
            </Provider>

        );
    }
}

export default App;
