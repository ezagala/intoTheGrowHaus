import React, {Fragment, Component } from 'react'; 
import ReactDOM from 'react-dom'

import config from '../config.json'; 

import { Map, TileLayer } from 'react-leaflet'; 
import MapBoxGLLayer from './MapBoxGLLayer'; 


export default class MasterMap extends Component {

  state = { 
    defaultFocus: [39.747, -104.987], //Denver's lat & lng 
    zoom: 13
  }

  render() {
    const {state, props } = this; 
    return(
      <Fragment>
        <Map
          style={{height: "100vh"}}
          center={state.defaultFocus} 
          zoom={this.state.zoom}
        >
          <MapBoxGLLayer
            accessToken={config.MAPBOX_ACCESS_TOKEN}
          />
        </Map>
      </Fragment>
    )
  }
}