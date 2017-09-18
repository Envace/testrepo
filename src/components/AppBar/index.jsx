import React from 'react'
import { NavLink } from 'react-router-dom'

import { withTheme } from 'material-ui/styles'
import { AppBar as AppbarMaterial } from 'material-ui'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SubMenu from 'components/SubMenu'
import AppIcon from 'components/AppIcon'

@withTheme
export default class AppBar extends React.Component {
    render() {
        return (
            <div>
                <AppbarMaterial theme={ this.props.theme } position="fixed" color="primary">
                    <Toolbar>
                        <NavLink to="/">
                            <IconButton color="contrast" aria-label="Menu">
                                <AppIcon icon="table" />
                            </IconButton>
                        </NavLink>

                        <Typography type="title" color="inherit" style={{flex: 1}}>
                        </Typography>

                        <SubMenu />
                        
                    </Toolbar>
                </AppbarMaterial>
            </div>
        )
    }
}