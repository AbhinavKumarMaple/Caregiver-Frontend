import React from "react";
import { location as locationIcon } from "../../assets";

interface AddressType {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface LocationMapProps {
  location: {
    lat: number | null;
    long: number | null;
  };
  address?: AddressType;
  title?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  location,
  address,
  title = "Location",
}) => {
  const hasValidLocation =
    location && location.lat !== null && location.long !== null;

  return (
    <div className="mt-8">
      {hasValidLocation ? (
        <div className="flex flex-col md:flex-row items-center overflow-hidden">
          <div className="h-[178px] w-[243px] md:w-map rounded-[16px] overflow-hidden">
            <iframe
              title={`${title} Map`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.long}&zoom=15`}
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 w-full md:w-1/2 md:ml-5">
            {address && (
              <div className="flex items-start">
                <div className="flex flex-col">
                  <p className="font-roboto font-normal text-address leading-address tracking-address text-task-text">
                    {address.street}
                  </p>
                  <p className="font-roboto font-normal text-address leading-address tracking-address text-task-text mt-1">
                    {address.city}, {address.state}, {address.pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-button p-4 text-center">
          <img
            src={locationIcon}
            alt="location"
            className="w-8 h-8 mx-auto mb-2 opacity-50"
          />
          <p className="font-roboto font-normal text-description text-gray-500">
            No location data available
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
