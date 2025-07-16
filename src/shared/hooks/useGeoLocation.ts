import { useState, useEffect } from "react";

interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation((prev) => ({ ...prev, error: error.message }));
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};

export default useGeoLocation;
