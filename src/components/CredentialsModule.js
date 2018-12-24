import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {hideLoader, showLoader} from '../redux/actions'

import {getCredentials} from '../ovh/api/me'
import Credential from './Credential'
import DialogDetails from './CredentialDialogDetails'

import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from "@material-ui/core/TableRow"
import TableCell from '@material-ui/core/TableCell'
import Paper from "@material-ui/core/es/Paper/Paper"

const mapDispatchToProps = {
    hideLoader,
    showLoader
}

const styles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    }
})

class CredentialsModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            credentials: [],
            dialogIsOpen: false,
            dialogCredentialInfo: null
        }
    }

    handleDialogOpen = (credentialInfo) => {
        this.setState({
            dialogCredentialInfo:credentialInfo,
            dialogIsOpen: true
        })
    }

    handleDialogClose = () => {
        this.setState({
            dialogIsOpen: false
        })
    }


    async componentDidMount() {
        this.props.showLoader('Retrieving credentials')
        const credentialsId = await getCredentials()
        this.setState({initDone: true, credentials: credentialsId})
        this.props.hideLoader()
    }

    render() {
        if (!this.state.initDone) return null
        const {classes} = this.props
        const nbRows = this.state.credentials.length > 10 ? 10 : this.state.credentials.length
        const credentialItems = [...this.state.credentials].reverse().slice(0, nbRows).map((id) =>
            <Credential key={id} id={id} openDialog={this.handleDialogOpen}/>
        )

        return (
            <React.Fragment>
                <DialogDetails
                    open={this.state.dialogIsOpen}
                    onClose={this.handleDialogClose}
                    credentialInfo={this.state.dialogCredentialInfo}
                />
                < Paper className={classes.root} xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Application</TableCell>
                                <TableCell>Creation</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {credentialItems}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

CredentialsModule.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CredentialsModule))