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

const wrappedPromise = function() {
  var wrappedPromise: any = {},
      promise = new Promise(function
         (resolve, reject) {
          wrappedPromise.resolve = resolve;
          wrappedPromise.reject = reject;
      });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
}

type GoogleLocation = [number, number]

/**
* Direction properties indicating origin and destination, along with the travel mode which defaults to 'DRIVING'.
* See https://developers.google.com/maps/documentation/javascript/directions#TravelModes for available properties.
*/
export interface DirectionProps {
origin: GoogleLocation,
destination: GoogleLocation,
travelMode?: string
}

export class Direction extends React.Component<any & DirectionProps, any> {
  private directionPromise: any;
  private directionsRenderer: any;

  componentDidMount() {
    this.directionPromise = wrappedPromise();
    this.renderDirection();
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.map !== prevProps.map
    ) {
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null);
      }
      this.renderDirection();
    }
  }

  componentWillUnmount() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  }

  renderDirection() {
    const {
      map,
      google,
      origin,
      destination,
      travelMode
    } = this.props;

    if (!google || !map) {
        return null;
    }
    
    const directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const request = {
      origin: new google.maps.LatLng(origin[0], origin[1]),
      destination: new google.maps.LatLng(destination[0], destination[1]),
      travelMode: google.maps.TravelMode[travelMode || "DRIVING"]
    };

    directionsService.route(request, (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
      }
    });

    this.directionPromise.resolve(this.directionPromise);
  }

  render() {
    return null;
  }
}
