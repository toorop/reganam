import React from 'react'

import connect from "react-redux/es/connect/connect"

import {showLoader, hideLoader, showSnackbar} from "../redux/actions"
import Connect from '../components/ConnectPaper'
import user from '../models/User'
import {getCurrentCredential} from "../ovh/api/auth"
import store from "../redux/store"

const mapDispatchToProps = {
    showLoader,
    hideLoader,
    showSnackbar
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showConnect: false,
            region: 'ovh-eu'
        }
    }

    async componentDidMount()  {
        this.props.showLoader('Init in progress')

        // todo get time drift -> state
        store.dispatch(showLoader('🕰️ Getting time drift between you and OVH space-time'))

        // check for CK
        user.load()
        if (user.ck===''){
            user.reset()
            this.setState({showConnect: true})
            this.props.hideLoader()
            return
        }
        // todo validate region
        this.setState({region: user.region})

        // is ck valid ?
        this.props.showLoader('Key found 🖖 !')

        // get ck info
        let response
        try {
             response = await getCurrentCredential()
        } catch (e) {
            console.log(e.response.data)
            if (e.response.data.errorCode === 'INVALID_CREDENTIAL') {
                this.props.showSnackbar('Your token has expired 😭', 'error')
            }
            this.setState({showConnect: true})
            // todo user.reset()
            return
        }

        const {expiration} = response.data

        console.log(expiration)
    }

    render() {
        return (
            this.state.showConnect ? <Connect region={this.state.region}/> : null
        )
    }

}

export default connect(null, mapDispatchToProps)(Home)