import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isLogged: state.clientKey !== ''
    }
}

const ProtectedRoute = ({component: Component, isLogged, ...rest}) => {
    return (
        < Route
            {...rest}
            render={
                (props) => isLogged === true
                    ? <Component {...props} {...rest}/>
                    : <Redirect to={{
                        pathname: '/',
                        want: rest.path
                    }}/>
            }
        />
    )
}

export default connect(mapStateToProps)(ProtectedRoute)