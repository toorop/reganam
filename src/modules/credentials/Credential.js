import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from "@material-ui/core/es/Typography/Typography"
import InfoIcon from '@material-ui/icons/Info'

import {getAppInfo, getCredentialInfo} from '../../ovh/api/me'


const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 1,
    },
    iconButton: {
        fontSize: '30px'
    },
    progress: {
        display: 'flex',
        justifyContent: 'center'
    }
})

class Credential extends React.Component {
    constructor(props) {
        super(props)
        const {id} = props
        this.state = {
            initDone: false,
            info: {
                id: id,
                applicationId: 0,
                applicationName: '',
                applicationDescription: '',
                ovhSupport: false,
                creation: 0,
                expiration: 0,
                status: '',
                rules: [],
            },

        }
    }

    async componentDidMount() {
        // get credential info
        const credentialInfo = await getCredentialInfo(this.state.info.id)

        // get application info
        const appInfo = await getAppInfo(this.state.info.id)
        const info = {
            id: this.state.info.id,
            applicationId: appInfo.applicationId,
            applicationName: appInfo.name,
            applicationDescription: appInfo.description,
            ovhSupport: credentialInfo.ovhSupport,
            creation: new Date(credentialInfo.creation),
            expiration: new Date(credentialInfo.expiration),
            status: credentialInfo.status,
            rules: credentialInfo.rules
        }

        this.setState({
            initDone: true,
            info: info
        })

    }

    render() {
        const {classes, openDialog} = this.props

        if (!this.state.initDone) {
            return (
                <TableRow>
                    <TableCell>
                        <div key={this.state.info.id} className={classes.progress}><CircularProgress/></div>
                    </TableCell>
                </TableRow>
            )
        }

        return (
            <TableRow key={this.state.id}>
                <TableCell component="th" scope="row">
                    <Typography variant={'overline'}>
                        {this.state.info.applicationName}
                    </Typography>
                </TableCell>
                <TableCell>{this.state.info.creation.toLocaleString()}</TableCell>
                <TableCell>
                    <IconButton color="primary" aria-label="More info" className={classes.iconButton} onClick={() => openDialog(this.state.info)}>
                        <InfoIcon className={classes.iconButton}/>
                    </IconButton>
                </TableCell>
            </TableRow>

        )
    }
}

export default withStyles(styles)(Credential)