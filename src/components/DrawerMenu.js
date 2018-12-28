import React from 'react'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LockIcon from '@material-ui/icons/Lock'
import Receipt from '@material-ui/icons/Receipt'

import Typography from '@material-ui/core/es/Typography/Typography'

const DrawerMenu = (props) => {
    const {open, onClose} = props
    return (
        <Drawer open={open} onClose={onClose}>
            <div
                tabIndex={0}
                role="button"

            >
                <div className={null}>
                    <Typography variant={'h6'} align={'center'}
                                style={{marginTop: '1rem', marginBottom: '0.5rem'}}>Modules</Typography>
                    <List>
                        <ListItem button key={'API'} onClick={() => onClose('credentials')}>
                            <ListItemIcon><LockIcon/></ListItemIcon>
                            <ListItemText primary='Credentials'/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key={'Billing'} onClick={() => onClose('billing')}>
                            <ListItemIcon><Receipt/></ListItemIcon>
                            <ListItemText primary='Billing'/>
                        </ListItem>
                    </List>
                </div>
            </div>
        </Drawer>
    )
}

export default DrawerMenu


