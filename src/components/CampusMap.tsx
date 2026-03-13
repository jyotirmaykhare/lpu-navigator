import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

import { campusLocations } from "@/data/campusLocations";
import { useEffect } from "react";

// Vite fix: ensure routing plugin attaches to Leaflet
const Routing = (L as any).Routing;


function MapRoute({ from, to }: { from: string; to: string }) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const start = campusLocations.find((loc) =>
      loc.name.toLowerCase().includes(from.toLowerCase())
    );

    const end = campusLocations.find((loc) =>
      loc.name.toLowerCase().includes(to.toLowerCase())
    );

    if (!start || !end) return;

    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(start.position[0], start.position[1]),
        L.latLng(end.position[0], end.position[1]),
      ],

      router: (L as any).Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),

      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6 }],
      },

      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: () => null,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [from, to, map]);

  return null;
}




function MapFlyTo({ destination }: { destination: string }) {
  const map = useMap();

  useEffect(() => {
    if (!destination) return;

    const location = campusLocations.find((loc) =>
      loc.name.toLowerCase().includes(destination.toLowerCase())
    );

    if (location) {
      map.flyTo(location.position, 18);
    }
  }, [destination, map]);

  return null;
}

type CampusMapProps = {
  from: string;
  to: string;
};

// Fix marker icon issue in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center: [number, number] = [31.2536, 75.7033];

const CampusMap = ({ from, to }: CampusMapProps) => {
  return (
    <div className="px-4 pb-8">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo destination={to} />
        <MapRoute from={from} to={to} />

        {campusLocations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
