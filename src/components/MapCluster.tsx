import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ClusterMapProps {
  locations: Array<{ name: string; position: [number, number]; image?: string }>;
  center?: [number, number];
  zoom?: number;
}

const MapCluster: React.FC<ClusterMapProps> = ({ locations, center = [31.2536, 75.7033], zoom = 16 }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "600px", width: "100%", borderRadius: 18 }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={loc.position}>
          <Popup>
            <b>{loc.name}</b>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapCluster;
