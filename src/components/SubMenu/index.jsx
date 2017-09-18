import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Dialog, DialogTitle, IconButton } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'
import * as a from 'store/actions'


@withRouter
@connect(store => ({
    user: store.user,
    t: store.translations,
    app: store.app
}))
export default class SubMenu extends React.Component {

    state = {
        menuOpen: false,
        menuAnchorEl: null,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.app.loginModalOpen && nextProps.user.loggedIn) {
            this.props.dispatch(a.loginModalClose())
        }
    }

    handleLogin = () => {
        this.props.dispatch(a.userLogin())
    }

    handleLogout = () => {
        this.props.dispatch(a.userLogout())
        this.closeSubMenu()
    }

    closeSubMenu = () => {
        this.props.dispatch(a.subMenuClose())
    }

    onSettingsClick = () => {
        this.props.history.push('/settings')
        this.closeSubMenu()
    }

    render() {
        const { user, t, app } = this.props
        const { menuOpen } = this.state

        return (
            user.loggedIn ?
                <div className="submenu-area">
                    <IconButton
                        onClick={ () => this.props.history.push('/profile') }
                        color="contrast"
                        aria-label="More">
                        <AccountCircleIcon />
                    </IconButton>
                   
                    <IconButton
                        color="contrast"
                        aria-label="More"
                        aria-owns={ app.subMenu.open ? 'sub-menu' : null }
                        aria-haspopup="true"
                        onClick={ e => this.props.dispatch(a.subMenuOpen(e.currentTarget)) }>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="sub-menu"
                        anchorEl={ app.subMenu.anchorEl }
                        open={ app.subMenu.open }
                        onRequestClose={ this.closeSubMenu }>
                        <MenuItem
                            onClick={ this.onSettingsClick }>
                            { t.submenu_label_settings }
                        </MenuItem>
                        <MenuItem
                            onClick={ this.handleLogout }>
                            { t.submenu_label_logout }
                        </MenuItem>
                    </Menu>
                </div>
            :
                <div className="login-area">
                    <Button
                        onClick={ () => this.props.dispatch(a.loginModalOpen()) }
                        color="contrast">
                        { t.btn_login_label }
                    </Button>
                    <Dialog
                        open={ app.loginModalOpen }
                        onRequestClose={ () => this.props.dispatch(a.loginModalClose()) }>
                        <DialogTitle>{ t.modal_login_title }</DialogTitle>
                        <Button 
                            color="primary"
                            onClick={ this.handleLogin }>
                            { user.loggingIn ? 
                                <CircularProgress 
                                    color="primary" 
                                    size={14} 
                                />
                            :
                                t.modal_btn_login_label
                            }
                        </Button>
                    </Dialog>
                </div>
        )
    }
}