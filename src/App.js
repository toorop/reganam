import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Provider} from 'react-redux'
import store from './redux/store'

import {BrowserRouter, Route, Switch} from "react-router-dom"

import Snackbar from './components/Snackbar'

// screens
import Notfound from '../src/containers/NotFound'
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

                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route component={Notfound} />
                    </Switch>
                </BrowserRouter>


            </Provider>

        );
    }
}

export default App;
