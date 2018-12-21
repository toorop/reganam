import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
import {getAppInfo, getCredentialInfo} from "../ovh/api/me"
import Typography from "@material-ui/core/es/Typography/Typography"

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 1,
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
            id: id,
            applicationId: 0,
            applicationName: '',
            applicationDescription: '',
            ovhSupport: false,
            creation: 0,
            expiration: 0,
            status: '',
            rules: [],
        }
    }

    async componentDidMount() {
        // get credential info
        const credentialInfo = await getCredentialInfo(this.state.id)

        // get application info
        const appInfo = await getAppInfo(this.state.id)
        this.setState({
            initDone: true,
            applicationId: appInfo.applicationId,
            applicationName: appInfo.name,
            applicationDescription: appInfo.description,
            ovhSupport: credentialInfo.ovhSupport,
            creation: new Date(credentialInfo.creation),
            expiration: new Date(credentialInfo.expiration),
            status: credentialInfo.status,
            rules: credentialInfo.rules
        })

    }

    render() {
        const {classes} = this.props
        if (!this.state.initDone) {
            return (
                <TableRow>
                    <TableCell>
                        <div key={this.state.id} className={classes.progress}><CircularProgress/></div>
                    </TableCell>
                </TableRow>
            )
        }

        return (
            <TableRow key={this.state.id}>
                <TableCell component="th" scope="row">
                    <Typography variant={'overline'}>
                        {this.state.applicationName}
                    </Typography>
                </TableCell>
                <TableCell>{this.state.creation.toDateString()}</TableCell>
                <TableCell>{this.state.expiration.toDateString()}</TableCell>
                <TableCell>{JSON.stringify(this.state.rules)}</TableCell>
                <TableCell>{this.state.status}</TableCell>
                <TableCell>
                    <Button variant="contained" color="secondary" size="small">
                        Delete
                    </Button>
                </TableCell>
            </TableRow>

        )
    }
}

export default withStyles(styles)(Credential)