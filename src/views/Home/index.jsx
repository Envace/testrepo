import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import * as a from 'store/actions'
import AppIcon from 'components/AppIcon'

import NewTable from 'views/Home/NewTable'
import OpenTables from 'views/Home/OpenTables'
import MyTables from 'views/Home/MyTables'

import './index.scss'


@withRouter
@connect(store => ({
    t: store.translations,
    app: store.app
}))
export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.syncIndexToPath(props.match.params.path)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.path !== this.props.match.params.path) {
            this.syncIndexToPath(nextProps.match.params.path)
        }
    }

    syncIndexToPath = path => {
        this.props.dispatch(a.homeSetTabIndex(this.getIndexFromPath(path)))
    }

    getIndexFromPath = path => {
        switch(path) {
            case 'new':
                return 0
            case '':
                return 1
            case 'mytables':
                return 2
        }
    }

    getPathFromIndex = index => {
        switch(index) {
            case 0:
                return 'new'
            case 1:
                return ''
            case 2:
                return 'mytables'
        }
    }

    handleChangeIndex = index => {
        this.props.history.push(this.getPathFromIndex(index))
    }

    render() {
        const { t } = this.props
        const { tabIndex } = this.props.app.home


        return (
            <div id="home">
                <SwipeableViews
                    index={ tabIndex } 
                    onChangeIndex={this.handleChangeIndex}
                    className="swipeable-views">

                    <NewTable isActive={ tabIndex === 0 } />
                    <OpenTables isActive={ tabIndex === 1 } />
                    <MyTables isActive={ tabIndex === 2 } />
                </SwipeableViews>

                <BottomNavigation 
                    id="bottom-navigation"
                    value={ tabIndex }
                    onChange={(e, val) => this.handleChangeIndex(val) }>

                    <BottomNavigationButton 
                        label={ t.home_bottomnavigation_new }
                        value={0}
                        icon={<AppIcon icon="table-add" />} 
                    />
                    <BottomNavigationButton 
                        label={ t.home_bottomnavigation_search }
                        value={1}
                        icon={<AppIcon icon="table-search" />} 
                    />
                    <BottomNavigationButton 
                        label={ t.home_bottomnavigation_mytables }
                        value={2}
                        icon={<AppIcon icon="table-list" />}
                    />
                
                </BottomNavigation>
                <div style={{height: '80px'}}></div>
            </div>
        )
    }
}