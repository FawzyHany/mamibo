"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // using shadcn button
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  onSelect: (lat: number, lng: number) => void;
  defaultCenter?: [number, number];
};

// This component handles marker placement from both click and GPS
function LocationMarker({
  position,
}: {
  position: [number, number] | null;
}) {
  return position ? <Marker position={position} /> : null;
}

export default function DeliveryMap({
  onSelect,
  defaultCenter = [30.0444, 31.2357],
}: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  // Handle manual map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelect(lat, lng);
      },
    });
    return null;
  };

  // Handle GPS button click
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setPosition([lat, lng]);
        onSelect(lat, lng);

        // Pan the map to this location
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 26);
        }
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom
        className="h-[400px] w-full rounded-md"
        ref={(ref) => {
          // react-leaflet passes Leaflet Map instance to ref callback
          if (ref) {
            mapRef.current = ref;
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        <LocationMarker position={position} />
      </MapContainer>

      {/* GPS Button overlay in corner of map */}
      <div className="absolute top-2 right-2 z-[1000]">
        <Button className=" bg-[var(--primary-color2)] cursor-pointer hover:bg-[var(--primary-color2)]" size="sm" onClick={handleDetectLocation}>
          📍 Detect My Location
        </Button>
      </div>
    </div>
  );
}
