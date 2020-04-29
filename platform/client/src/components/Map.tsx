import React, { useRef, useEffect } from 'react';

interface Location {
  lat: string
  long: string,
  name: string
}

export const Map: React.FC<Location> = ({ lat, long, name }) => {
  const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>();
  let latitude = parseInt(lat!)
  let longitude = parseInt(long!)

  useEffect(() => {

    if (mapEle.current !== null) {

      map.current = new google.maps.Map(mapEle.current, {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 16
      });

      addMarkers();
    }

    function addMarkers() {
      let infoWindow = new google.maps.InfoWindow({
        content: `<h5>${name}</h5>`
      });

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map.current!,
        title: name
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
      });
    }
  }, [latitude, longitude, name]);
    
  
  return (
    <div style={{ width: "800px", height: "400px", margin: "0 auto", padding: "20px" }}>
      <div ref={mapEle}  style={{
      height: "100%",
      width: "100%",
      position: "relative",
      backgroundColor: "transparent",
      opacity: 1,
      transition: "opacity 250ms ease-in"
    }}></div>
    </div>
  );
}
