import React from 'react'
import { createBrowserHistory } from 'history';
import {withStyles} from '@material-ui/core/styles'

import Header from './Header'
import Footer from './Footer'

import DrawerMenu from './DrawerMenu'

import Todo from '../modules/todo/Todo'
import CredentialsModule from '../modules/credentials/CredentialsModule'

const history = createBrowserHistory()

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    module: {
        flex: '1'
    }

})



class Module extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            module: this.props.module,
            drawerIsOpen: false
        }
    }

    drawerClose = (module) => {
        if (typeof module !== "object") {
            // todo dynamic import
            // update browser URL
            history.push(`/${module}`)
            switch (module) {
                case 'credentials':
                    this.setState({module: CredentialsModule})
                    break
                case 'billing':
                    this.setState({module: Todo})
                    break
                case 'fileBrowser':
                    this.setState({module: Todo})
                    break
                default:
            }
        }
        this.setState({
            drawerIsOpen: false
        })
    }

    drawerOpen = () => {
        this.setState({
            drawerIsOpen: true
        })
    }

    render() {
        const {classes, ...rest} = this.props
        const {module: Module} = this.state
        return (
            <div className={classes.root}>
                <DrawerMenu open={this.state.drawerIsOpen} onClose={this.drawerClose}/>
                <Header drawerOpen={this.drawerOpen}/>
                <main className={classes.module}>
                    <Module {...rest}/>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(Module)
