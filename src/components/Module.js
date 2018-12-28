import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import Header from './Header'
import Footer from './Footer'

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    module: {
        flex: '1'
    }

})

const Module = (props) => {
    const {module: Module, classes, ...rest} = props
    return (
        <div className={classes.root}>
            <Header/>
            <main className={classes.module}>
                <Module {...rest}/>
            </main>
            <Footer/>
        </div>
    )
}

export default withStyles(styles)(Module)
