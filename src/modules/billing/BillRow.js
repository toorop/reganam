import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {getBill} from '../../ovh/api/me'
import TableRow from "@material-ui/core/TableRow/TableRow"
import TableCell from "@material-ui/core/TableCell/TableCell"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import Typography from "@material-ui/core/es/Typography/Typography"
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 1,
    },
    link: {
       color: 'inherit'
    },
    iconButton: {
        fontSize: '30px'
    },
    progress: {
        display: 'flex',
        justifyContent: 'center'
    }
})


class BillRow extends React.Component {

    constructor(props) {
        super(props)
        const {id} = props
        this.state = {
            initDone: false,
            id: id,
            info: null
        }

    }

    async componentDidMount() {
        const billInfo = await getBill(this.state.id)
        this.setState({
            info: billInfo,
            initDone: true
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

        const date = new Date(this.state.info.date)
        return (
            <TableRow key={this.state.id} className={classes.row} hover={true}>
                <TableCell component="th" scope="row">
                    <Typography variant={'overline'}>
                        {this.state.info.billId}
                    </Typography>
                </TableCell>
                <TableCell>{date.toLocaleString()}</TableCell>
                <TableCell>{this.state.info.priceWithTax.text}</TableCell>
                <TableCell><a className={classes.link} href={this.state.info.pdfUrl}><CloudDownloadIcon/></a></TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(BillRow)