import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {LoaderContext} from './contexts/LoaderContext'

import Home from '../src/containers/Home'

import './App.css';
import Loader from "./components/Loader"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderIsVisible: false
        }
    }

    setVisibility = (isVisible) => {
        console.log('on set visibility')
        this.setState({loaderIsVisible: isVisible})
    }

    render() {
        return (
            <React.Fragment>
                <LoaderContext.Provider
                    value={{isVisible: this.state.loaderIsVisible, setVisibility: this.setVisibility}}>
<Loader/>
<CssBaseline/>
<Home/>
</LoaderContext.Provider>
</React.Fragment>
);
}
}

export default App;
