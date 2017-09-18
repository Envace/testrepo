import React from 'react'
import Paper from 'material-ui/Paper'
import InputField from 'components/InputField'
import Divider from 'material-ui/Divider'
import { withTheme } from 'material-ui/styles'
import GoogleMaps from 'components/GoogleMaps'
import MyLocationIcon from 'material-ui-icons/MyLocation'
import Button from 'material-ui/Button'

import './index.scss'       

@withTheme
export default class NewTable extends React.Component {

    constructor(props) {
        super(props)

        this.gradientStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundImage: `
                 linear-gradient(150deg, ${this.props.theme.palette.primary[400]} 20%, transparent 20%)
            `,
            width: '100%',
            height: '100vh'
        }       
    }

    render() {

        return (
            <div className="new-table page">
                <div className={`gradient ${this.props.isActive ? 'in' : 'out'}`} style={ this.gradientStyle }></div>
                <div className="map-wrapper row">
                    <Paper 
                        className={`paper map ${this.props.isActive ? 'in' : 'out'}`}>
                        <GoogleMaps />
                    </Paper>
                    <div className="column panel">
                         <Button 
                            fab
                            color="primary" 
                            aria-label="my-location"
                            className="btn-my-location">
                            <MyLocationIcon />
                        </Button>
                    </div>
                </div>
                <Paper className={`paper input-paper ${this.props.isActive ? 'in' : 'out'}`}>
                    <InputField 
                        id="title"
                        label="Title"
                        fullWidth
                    />

                    <InputField 
                        id="description"
                        label="Description"
                        fullWidth
                        multiline
                        row="2"
                        rowsMax="4"
                    />
                </Paper>
            </div>
        )
    }
}