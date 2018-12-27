import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Provider} from 'react-redux'
import store from './redux/store'

import {BrowserRouter, Route, Switch} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import Snackbar from './components/Snackbar'
import DrawerMenu from './components/DrawerMenu'

// screens
import Notfound from '../src/containers/NotFound'
import Home from '../src/containers/Home'


import Loader from './components/Loader'
import Dashboard from './modules/dashboard/Dashboard'
import Module from './components/Module'
import CredentialsModule from './modules/credentials/CredentialsModule'

import './App.css'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CssBaseline/>
                <Loader/>
                <Snackbar/>
                <DrawerMenu/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <ProtectedRoute path='/dashboard' component={Module} module={Dashboard}/>
                        <ProtectedRoute exact path='/credentials' component={Module} module={CredentialsModule}/>
                        <Route component={Notfound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
