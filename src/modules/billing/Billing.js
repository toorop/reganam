import React from 'react'
import {connect} from 'react-redux'

import JSZip from 'jszip'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from "@material-ui/core/TableRow"
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from "@material-ui/core/Paper/Paper"
import Typography from '@material-ui/core/Typography/Typography'
import TextField from '@material-ui/core/TextField'

import {hideLoader, showLoader, showSnackbar} from '../../redux/actions'
import BillRow from './BillRow'
import {getBill, getBills} from '../../ovh/api/me'

// indexDB
// indexDB
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

// utils

Array.range = function (n) {
    // Array.range(5) --> [0,1,2,3,4]
    return Array.apply(null, Array(n)).map((x, i) => i)
};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {
        return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n))
    }
})

// formatDate format Date for input
const formatDate = d => {
    let day = d.getDate()
    if (day < 10) day = `0${day}`

    let month = d.getMonth() + 1
    if (month < 10) month = `0${month}`

    return `${d.getFullYear()}-${month}-${day}`
}

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
        alignItems: 'center',
        paddingLeft: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    datesSelector: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
        width: '99vw'
    },
    dlButton: {
        marginBottom: theme.spacing.unit * 2,
    },
    paper: {
        overflowX: 'auto',
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    }
})

class Billing extends React.Component {
    constructor(props) {
        super(props)
        let dateFrom = new Date()
        dateFrom.setMonth(dateFrom.getMonth() - 1)
        this.state = {
            initDone: false,
            billIds: [],
            dateFrom: dateFrom,
            dateTo: new Date(),
            rowsPerPage: 10,
            page: 0
        }
    }

    async componentDidMount() {

        this.props.showLoader('Fetching bills')
        const billIds = await getBills(this.state.dateFrom.getTime(), this.state.dateTo.getTime())
        this.setState({
            billIds: billIds.reverse(),
            initDone: true
        })
        this.props.hideLoader()
    }

    handleChangeDate = async e => {
        const d = new Date(e.target.value)
        if (e.target.id === 'dateFrom') {
            if (d > this.state.dateTo) {
                this.props.showSnackbar('From date must be before To date 😝', 'error')
                return
            }
            await this.setState({dateFrom: d})

        } else {
            if (d < this.state.dateFrom) {
                this.props.showSnackbar('To date must be after From date 😝', 'error')
                return
            }
            await this.setState({dateTo: d})
        }
        const billIds = await getBills(this.state.dateFrom.getTime(), this.state.dateTo.getTime())
        this.setState({
            billIds: billIds.reverse()
        })
    }

    // download bills
    handleDlClick = async () => {
        const filename = `ovh-bills-${formatDate(this.state.dateFrom)}--${formatDate(this.state.dateTo)}`

        let db = null
        try {
            await (async () => new Promise((resolve, reject) => {
                const request = indexedDB.open('reganam', 1)
                request.onerror = e => {
                    reject(e)
                }
                // upgrade needed ?
                request.onupgradeneeded = e => {
                    db = e.target.result;
                    //const objectStore =
                    db.createObjectStore("billspdf");
                }

                // success
                request.onsuccess = e => {
                    db = e.target.result
                    resolve()
                }
            }))()
        } catch (e) {
            this.props.hideLoader()
            this.props.showSnackbar('unable to initialize indexDB. ' + e, 'error')
            return
        }

        const nbBills = this.state.billIds.length
        let nbBillsDownloaded = 0
        this.props.showLoader(`downloading bills from OVH 0/${nbBills}`)

        // filter this.state.billIds to keep only those that are not in indexDB
        let ip2fetch = []
        try {
            let promises = this.state.billIds.map(id => new Promise((resolve, reject) => {
                const request = db.transaction(["billspdf"], "readonly").objectStore("billspdf").get(id)
                request.onsuccess = e => {
                    if (e.target.result === undefined) {
                        ip2fetch.push(id)
                    }
                    resolve()
                }
                request.onerror = e => {
                    reject(e)
                }
            }))
            await Promise.all(promises)
        } catch (e) {
            this.props.hideLoader()
            this.props.showSnackbar('unable to check cache (indexDB). ' + e, 'error')
            return
        }

        nbBillsDownloaded = nbBills - ip2fetch.length
        const chunks = ip2fetch.chunk(4)

        try {
            let promises = chunks.map((chunk, i) => new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        let promises2 = chunk.map(async id => new Promise(async (resolve1) => {
                            // get detail (normally in cache)
                            // todo cache
                            const {pdfUrl} = await getBill(id)

                            // get pdf and save each one in session storage
                            const r = await fetch('https://cors.ovh/?u=' + encodeURIComponent(pdfUrl), {
                                headers: {
                                    Accept: 'application/pdf',
                                },
                                responseType: 'arraybuffer',
                                mode: "cors"
                            }).then(r => r.arrayBuffer())

                            if (r.length === 0) {
                                reject(`downloading ${id} failed (length==0)`)
                            }

                            // save pdf in local storage
                            const transaction = db.transaction(["billspdf"], "readwrite")
                            transaction.onerror = e => {
                                reject(e)
                            }

                            await transaction.objectStore("billspdf").add(r, id)
                            //const request = objectStore;

                            nbBillsDownloaded++
                            this.props.showLoader(`downloading bills from OVH ${nbBillsDownloaded}/${nbBills}`)

                            // resolve
                            resolve1()
                        }))
                        // resolve
                        await Promise.all(promises2)
                        resolve()
                    }, i * 3100)
                }
            ))
            await Promise.all(promises)
            this.props.hideLoader()
        } catch (e) {
            this.props.hideLoader()
            this.props.showSnackbar('download failed. ' + e, 'error')
            return
        }

        this.props.showLoader('Hurra all files are downloaded ! i\'m generating zip file...')

        let zip = new JSZip()
        let folder = zip.folder(filename)

        try {
            let promises = this.state.billIds.map(id => new Promise((resolve, reject) => {
                // get pdf from indexDB
                const transaction = db.transaction(["billspdf"], "readonly")

                transaction.onerror = e => {
                    reject(e)
                }
                const objectStore = transaction.objectStore("billspdf")
                const request = objectStore.get(id)

                request.onerror = e => {
                    reject(e)
                }
                request.onsuccess = function (event) {
                    // todo
                    folder.file(`${id}.pdf`, request.result)
                    resolve()
                }
            }))

            await Promise.all(promises)

            this.props.hideLoader()

            zip.generateAsync({type: "blob"}).then(content => {
                const url = URL.createObjectURL(content)
                const fileLink = document.createElement('a')
                fileLink.setAttribute('href', url)
                fileLink.setAttribute('download', `${filename}.zip`)
                if (document.createEvent) {
                    const event = document.createEvent('MouseEvents')
                    event.initEvent('click', true, true)
                    fileLink.dispatchEvent(event)
                } else {
                    fileLink.click();
                }
            })
        } catch (e) {
            this.props.hideLoader()
            this.props.showSnackbar('ooops something wen wrong:  ' + e, 'error')
        }
    }

    handleChangePage = (e, page) => {
        this.setState({page: page})
    }

    handleChangeRowsPerPage = e => this.setState({rowsPerPage: e.target.value})

    render() {
        if (!this.state.initDone) return null

        const {classes} = this.props
        const {billIds, page, rowsPerPage} = this.state
        const start = page * rowsPerPage
        const billRows = [...billIds].slice(start, start + rowsPerPage)
            .map(id => <BillRow key={id} id={id}/>)

        return (
            <Paper className={classes.paper} xs={12}>
                <Typography className={classes.title} variant={'display1'} align={'center'}>Bills</Typography>
                <Grid container className={classes.datesSelector} justify='center' spacing={16}>
                    <Grid item>
                        <TextField
                            id="dateFrom"
                            label="From"
                            type="date"
                            defaultValue={formatDate(this.state.dateFrom)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChangeDate}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="dateTo"
                            label="To"
                            type="date"
                            defaultValue={formatDate(this.state.dateTo)}
                            InputLabelProps={{
                                shrink: true,

                            }}
                            onChange={this.handleChangeDate}
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.dlButton} container justify='center'>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleDlClick}>
                        Download bills
                    </Button>

                </Grid>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billRows}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={billIds.length}
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
        )
    }

}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Billing))

