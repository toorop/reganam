import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    loader: {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        opacity: '0.7',
        backgroundColor: 'white',
        zIndex: '666',
    },
    content: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        zIndex: '667',
        textAlign: 'center',
    },
    msgBox: {
        margin: theme.spacing.unit * 1,
        [theme.breakpoints.up(400)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        textAlign: 'left'
    },
    console: {
        whiteSpace: 'pre-wrap'
    }

})

const mapStateToProps = (state) => {
    return {
        isVisible: state.loaderIsVisible,
        msg: state.loaderMessage
    }
}

const Loader = (props) => {
    if (!props.isVisible) return null
    const {classes} = props
    return (
        <React.Fragment>
            <div className={classes.loader}></div>
            <div className={classes.content}>
                <Grid container wrap='nowrap'>
                    <Grid item xs={12} lg={6} className={classes.msgBox} >
                        <LinearProgress />
                        <pre className={classes.console}>{props.msg}</pre>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}
export default connect(mapStateToProps)(withStyles(styles)(Loader))