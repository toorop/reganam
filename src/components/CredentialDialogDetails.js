import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import Dialog from '@material-ui/core/es/Dialog/Dialog'
import DialogTitle from '@material-ui/core/es/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/es/DialogContent/DialogContent'
import Typography from '@material-ui/core/es/Typography/Typography'
import Button from "@material-ui/core/es/Button/Button"
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    title: {
        textAlign: 'center'
    },
    subTitle: {
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center'
    }
})

const DialogDetails = (props) => {
    const {credentialInfo, classes, onClose, ...rest} = props
    if (credentialInfo === null) return null
    return (
        <Dialog
            maxWidth='md'
            onClose={onClose}
            {...rest}
        >
            <DialogTitle className={classes.title}>
                {credentialInfo.applicationName.toUpperCase()}
                <Typography className={classes.subTitle} variant={"caption"}>
                    {credentialInfo.applicationDescription}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Token ID:</strong> {credentialInfo.id}
                    </Typography>
                </div>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Application ID:</strong> {credentialInfo.applicationId}
                    </Typography>
                </div>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Creation:</strong> {credentialInfo.creation.toLocaleString()}
                    </Typography>
                </div>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Expiration:</strong> {credentialInfo.expiration.toLocaleString()}
                    </Typography>
                </div>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Status:</strong> {credentialInfo.status}
                    </Typography>
                </div>
                <div>
                    <Typography variant={"body1"} className={classes.line}>
                        <strong>Rules:</strong> {JSON.stringify(credentialInfo.rules)}
                    </Typography>
                </div>
                <Grid container className={classes.buttonContainer} justify={"center"} spacing={16}>
                    <Grid item>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => onClose(credentialInfo.id)}>
                            delete this token
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.button} onClick={()=>onClose(null)}>
                            close
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog>
    )
}

export default withStyles(styles)(DialogDetails)