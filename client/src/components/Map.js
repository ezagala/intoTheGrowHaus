import React, { Component }from 'react'; 
import {Map, TileLayer} from 'react-leaflet'; 

export default class MasterMap extends Component {

  state = { 
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return(
      <Map 
        height="100%"
        center={position} 
        zoom={this.state.zoom}
      >
        <TileLayer
          attribution={'<a href="http://osm.org/copyright">OpenStreetMap</a>'}
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        >
        </TileLayer>
      </Map>
    )
  }
}