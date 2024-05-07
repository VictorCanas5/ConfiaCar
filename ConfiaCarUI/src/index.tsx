import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import "bootstrap/dist/css/bootstrap.min.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnlyb24yOCIsImEiOiJjbG5jank4YmQwNmF6MmlvYmJmeTR0eHluIn0.eTcaVDDCBN9nDL6G9reIoQ";

ReactDOM.render(<App />, document.getElementById("root"));
