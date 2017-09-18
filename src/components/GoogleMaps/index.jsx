import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"
import { CircularProgress } from 'material-ui/Progress'
import mapStyles from './styles.json'

const AsyncGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={3}
                defaultCenter={{lat: 50.826439, lng: 10.483318}}
                defaultOptions={{ styles: mapStyles}}>
            </GoogleMap>
        )
    )
)

export default class GoogleMaps extends React.Component {
    render() {
        return (
            <AsyncGoogleMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDn-j_JYjk28En1-UBTqtdjDeW2c3YUpWM"
                loadingElement={<CircularProgress />}
                containerElement={<div style={{ height: `60vw`, maxHeight: '480px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}