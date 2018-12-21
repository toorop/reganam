import React from 'react'
import {connect} from 'react-redux'

import {hideLoader, showLoader} from '../redux/actions'

import {getCredentials} from '../ovh/api/me'

import Credential from './Credential'

import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from "@material-ui/core/TableRow"
import TableCell from '@material-ui/core/TableCell'

const mapDispatchToProps = {
    hideLoader,
    showLoader
}

class CredentialsModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            credentials: []
        }
    }

    async componentDidMount() {
        this.props.showLoader('Retrieving credentials')
        const credentialsId = await getCredentials()
        this.setState({initDone: true, credentials: credentialsId})
        this.props.hideLoader()
    }

    render() {
        if (!this.state.initDone) return null
        const nbRows = this.state.credentials.length > 10 ? 10 : this.state.credentials.length
        const credentialItems = [...this.state.credentials].reverse().slice(0, nbRows).map((id) =>
            <Credential key={id} id={id}/>
        )

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Application</TableCell>
                        <TableCell>Creation</TableCell>
                        <TableCell>Expiration</TableCell>
                        <TableCell>Rules</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {credentialItems}
                </TableBody>
            </Table>
        )
    }
}

export default connect(null, mapDispatchToProps)(CredentialsModule)