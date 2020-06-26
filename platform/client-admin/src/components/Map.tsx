import React, { Component } from 'react';
import { Map as GoogleMap, GoogleApiWrapper, IMapProps } from 'google-maps-react';

interface Location {
  lat: number
  lng: number
}

interface MapProps {
  center: Location,
  zoom?: number
}

class MapContainer extends Component<Readonly<IMapProps> & MapProps> {
  render() {
    return (
      <div style={{ width: "100%", height: "300pt" }}>
        <GoogleMap
          google={this.props.google}
          zoom={this.props.zoom || 16}
          center={this.props.center}
          initialCenter={this.props.center}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            backgroundColor: "transparent",
            opacity: 1,
            transition: "opacity 250ms ease-in"
          }}>

          {this.props.children}

        </GoogleMap>
      </div>
    );
  }
}

export const Map = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""
})(MapContainer)
