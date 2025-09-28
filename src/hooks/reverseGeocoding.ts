import { useEffect, useState } from "react";

export function useReverseGeocoding(lat: number | null, lng: number | null) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchAddress = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        setAddress(data.display_name || "Unknown location");
      } catch (err) {
        setError(`${err}: Failed to fetch address`);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return { address, loading, error };
}
