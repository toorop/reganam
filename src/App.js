import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Provider} from 'react-redux'
import store from './redux/store'

import {BrowserRouter, Route, Switch} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import Snackbar from './components/Snackbar'


// screens
import Notfound from '../src/containers/NotFound'
import Home from '../src/containers/Home'


import Loader from './components/Loader'
import Dashboard from './modules/dashboard/Dashboard'
import Todo from './modules/todo/Todo'
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
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <ProtectedRoute path='/dashboard' component={Module} module={Dashboard}/>
                        <ProtectedRoute exact path='/billing' component={Module} module={Todo}/>
                        <ProtectedRoute exact path='/credentials' component={Module} module={CredentialsModule}/>
                        <Route component={Notfound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
