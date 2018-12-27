import React from 'react'
import Header from "./Header"

const Module = (props) => {
    const {module: Module, ...rest} = props
    return (
        <React.Fragment>
            <Header/>
            <Module {...rest}/>
        </React.Fragment>
    )
}

export default Module
