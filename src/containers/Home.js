import React from 'react'

import connect from "react-redux/es/connect/connect"

import {showLoader, hideLoader, logout, setClientKey, setRegion, showSnackbar} from "../redux/actions"
import Connect from '../components/ConnectPaper'
import user from '../models/User'
import {getTimeDrift} from '../ovh/time'
import {getCurrentCredential} from "../ovh/api/auth"

const mapDispatchToProps = {
    showLoader,
    hideLoader,
    logout,
    setClientKey,
    setRegion,
    showSnackbar
}

const mapStateToProps = (state) => {
    return {
        region: state.region
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showConnect: false,
        }
    }

    async componentDidMount() {
        this.props.showLoader('Init in progress')

        // check for CK
        user.load()
        if (user.ck === '' || user.region === '') {
            user.reset()
            this.setState({showConnect: true})
            await this.props.setRegion('ovh-eu')
            this.props.hideLoader()
            return
        }
        //  validate region
        if (user.region !== 'ovh-eu' && user.region !== 'ovh-us' && user.region !== 'ovh-ca') {
            user.reset()
            this.setState({showConnect: true})
            this.props.hideLoader()
            return
        }

        this.props.showLoader('Key found 🖖 !')

        // update state
        await this.props.setClientKey(user.ck)
        await this.props.setRegion(user.region)

        //  get time drift
        this.props.showLoader('🕰️ Getting time drift between you and OVH space-time')
        try {
            await getTimeDrift(user.region)
        } catch {
            this.props.showSnackbar('Could\'nt get time drift, expecting you are on the same space-time than OVH... ', 'error')
        }

        // get ck info
        let response
        try {
            response = await getCurrentCredential()
        } catch (e) {
            if (e.response.data.errorCode === 'INVALID_CREDENTIAL') {
                this.props.showSnackbar('Your token has expired 😭', 'error')
            }
            this.props.logout()
            this.props.hideLoader()
            this.setState({showConnect: true})
            return
        }

        // if expiration < 1 minutes => re-login
        const {expiration} = response.data
        const diff = Math.round((new Date(expiration).getTime() - new Date().getTime()) / 1000)
        if (diff < 60) {
            this.props.showSnackbar('Your token will expire in less than 60 sec. Requesting a new one seems to be a good idea', 'info')
            this.props.logout()
            this.props.hideLoader()
            this.setState({showConnect: true})
            return
        }

        // todo redirect to dashboard

    }

    render() {
        return (
            this.state.showConnect ? <Connect region={this.props.region}/> : null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)