import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar"
import IconButton from "@material-ui/core/es/IconButton/IconButton"
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from "@material-ui/core/es/Typography/Typography"

import {logout} from "../redux/actions"

import {getMe} from '../ovh/api/me'

const mapDispatchToProps = {
    logout,
}

const styles = (theme) => ({
    appBar: {
        //flexGrow: 1,
    },
    grow: {
        flexGrow: 1
    },
    drawnerButton: {
        marginRight: theme.spacing.unit * 1
    }

})

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            initDone: false,
            firstName: ''
        }
    }

    async componentDidMount() {
        // get me
        const me = await getMe()
        this.setState({initDone: true, firstName: me.firstname})
    }

    handleMenuUser = event => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleMenuUserClose = () => {
        this.setState({anchorEl: null})
    }

    handleLogout = () => {
        this.props.logout()
        this.setState({anchorEl: null})
    }

    render() {
        const {classes} = this.props
        const {anchorEl, firstName} = this.state
        const open = Boolean(this.state.anchorEl)
        return (
            <AppBar className={classes.appBar} position='static'>
                <Toolbar>
                    <IconButton className={classes.drawnerButton} color='inherit' aria-label='Menu'>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.grow} variant='h6' color='inherit'>

                    </Typography>
                    < Typography color="inherit">{firstName}</Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenuUser}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleMenuUserClose}
                        >
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(Header))

