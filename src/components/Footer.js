import React from 'react'

import {withStyles} from '@material-ui/core/styles'
import Typography from "@material-ui/core/es/Typography/Typography"
import grey from '@material-ui/core/colors/grey'

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        color: grey["500"]
    },
    link: {
        color: 'inherit'
    },
    svgIcon: {
        color: grey["500"]
    }
})

const Footer = (props) => {
    const {classes} = props
    return (
        <footer className={classes.root}>
            <Typography align='center' color={"inherit"}>
                Made with <span role='img'
                                aria-label='coffee'>☕</span> by <a
                className={classes.link} href="https://dpp.st">Stéphane Depierrepont</a> - <a className={classes.link}
                                                                                              href='https://github.com/toorop/reganam'>Github</a>

            </Typography>
        </footer>
    )
}

export default withStyles(styles)(Footer)