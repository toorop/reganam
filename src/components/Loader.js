import React from 'react'

import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    loader: {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        opacity: '0.5',
        backgroundColor: 'white',
        zIndex: '666',
    },
    progress: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        margin: 'auto',
        zIndex: '667'

    }

})


const Loader = (props) => {
    const {visible} = props
    const {classes} = props
    if (!visible) return null
    return (
        <React.Fragment>
            <div className={classes.loader}> </div>
            <CircularProgress className={classes.progress} size={80} thickness={5} disableShrink={true} />
        </React.Fragment>
    )
}

export default withStyles(styles)(Loader)
