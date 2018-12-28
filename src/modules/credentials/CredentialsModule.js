import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {hideLoader, showLoader, showSnackbar} from '../../redux/actions'

import {deleteCredential, getCredentials} from '../../ovh/api/me'
import Credential from './Credential'
import DialogDetails from './CredentialDialogDetails'

import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from "@material-ui/core/TableRow"
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from "@material-ui/core/Paper/Paper"
import Typography from '@material-ui/core/Typography/Typography'
import HelpOutline from '@material-ui/icons/HelpOutline'

const mapDispatchToProps = {
    hideLoader,
    showLoader,
    showSnackbar
}

const styles = theme => ({
    title: {
        margin: theme.spacing.unit * 3
    },
    tips: {
        display: 'flex',
        alignItems:'center',
        paddingLeft: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    paper: {
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
            dialogCredentialInfo: null,
            rowsPerPage: 10,
            page: 0
        }
    }

    handleDialogOpen = (credentialInfo) => {
        this.setState({
            dialogCredentialInfo: credentialInfo,
            dialogIsOpen: true
        })
    }

    handleDialogClose = async (credentialId) => {
        // delete credential
        if (credentialId !== null && typeof credentialId !== "object") {
            await deleteCredential(credentialId)
            const credentials = [...this.state.credentials].filter(Id => Id !== credentialId)
            this.setState({
                dialogIsOpen: false,
                credentials: credentials
            })
            this.props.showSnackbar(`Token ${credentialId} deleted`, 'success')
        } else {
            this.setState({
                dialogIsOpen: false,
            })
        }
    }

    handleChangePage = (e, page) => {
        this.setState({page: page})
    }

    handleChangeRowsPerPage = e => this.setState({rowsPerPage: e.target.value})

    async componentDidMount() {
        this.props.showLoader('Retrieving credentials')
        const credentialsId = await getCredentials()
        this.setState({initDone: true, credentials: credentialsId.reverse()})
        this.props.hideLoader()
    }

    render() {
        if (!this.state.initDone) return null
        const {classes} = this.props
        const {credentials, page, rowsPerPage} = this.state
        const start = page * rowsPerPage
        const credentialItems = [...credentials].slice(start, start + rowsPerPage).map((id) =>
            <Credential key={id} id={id} openDialog={this.handleDialogOpen}/>
        )
        return (
            <React.Fragment>
                <DialogDetails
                    open={this.state.dialogIsOpen}
                    onClose={this.handleDialogClose}
                    credentialInfo={this.state.dialogCredentialInfo}
                />
                <Paper className={classes.paper} xs={12}>
                    <Typography className={classes.title} variant={'display1'} align={'center'}>API
                        Credentials</Typography>
                    <Typography className={classes.tips} variant={'body2'}> <HelpOutline color={"primary"} fontSize={"default"}/> &nbsp;&nbsp;Click on a row to get details about a
                            token.</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Application</TableCell>
                                <TableCell>Creation</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {credentialItems}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={credentials.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

CredentialsModule.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CredentialsModule))