export const formatAddress = (
    location:
      | {
        house_number: string;
        street: string;
        city: string;
        state: string;
        pincode: string;
        lat: number;
        long: number;
      }
      | null
      | undefined
  ) => {
    if (!location) return "";

    const parts = [
      location.house_number,
      location.street,
      location.city,
      location.state,
      location.pincode,
    ].filter(Boolean);

    return parts.join(", ");
  };