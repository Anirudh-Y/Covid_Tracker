import React , {useState} from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
// import { showDataOnMap } from "./util";

function Map({ countries, casesType, center=[20.1,17,4], zoom }) {

    const [c,setC] = useState(center);

    return (
        <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(countries, casesType)} */}
      </LeafletMap>
        </div>
    );
}

export default Map;
