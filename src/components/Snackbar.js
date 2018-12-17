import React from 'react'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import green from '@material-ui/core/colors/green'
import InfoIcon from '@material-ui/icons/Info'
import amber from '@material-ui/core/colors/amber'
import SnackbarOri from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

import {hideSnackbar} from "../redux/actions"

const mapStateToProps = (state) => {
    return {
        isVisible: state.snackbarIsVisible,
        msg: state.snackbarMessage,
        level: state.snackbarLevel
    }
}

const mapDispatchToProps = {
    hideSnackbar
}

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    icon: {
        fontSize: '20',
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
})

const getIcon= (level) => {
    switch (level) {
        case 'warning':
            return WarningIcon
        case 'error':
            return ErrorIcon
        case 'info':
            return InfoIcon
        default:
            return CheckCircleIcon
    }
}


// todo propType
const Snackbar = (props) => {
    const handleClose = () => props.hideSnackbar()
    const {classes, level} = props
    const Icon = getIcon(level)
    return (
        <div>
            <SnackbarOri
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.isVisible}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <SnackbarContent
                    className={classes[level]}
                    aria-describedby='message-id'

                    message={
                        <span id="message-id" className={classes.message}>
                                <Icon className={classes.icon}/>
                            {props.msg}
                            </span>
                    }
                />
            </SnackbarOri>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Snackbar))