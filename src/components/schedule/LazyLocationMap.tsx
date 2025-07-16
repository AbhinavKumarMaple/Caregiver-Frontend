// src/components/schedule/LazyLocationMap.tsx
import React, { Suspense, lazy } from "react";
import LocationMapSkeleton from "./LocationMapSkeleton";

// Lazy load the LocationMap component
const LocationMap = lazy(() => import("./LocationMap"));

interface LazyLocationMapProps {
  location: {
    lat: number | null;
    long: number | null;
  };
  address?: {
    house_number: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    long: number;
  };
}

const LazyLocationMap: React.FC<LazyLocationMapProps> = (props) => {
  return (
    <Suspense fallback={<LocationMapSkeleton showTitle={false} />}>
      <LocationMap {...props} />
    </Suspense>
  );
};

export default LazyLocationMap;
