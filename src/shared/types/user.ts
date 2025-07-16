export interface Location {
  HouseNumber: string;
  Street: string;
  City: string;
  State: string;
  Pincode: string;
  Lat: number;
  Long: number;
}

export interface User {
  ID: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Status: boolean;
  Role: string;
  Location: Location;
  CreatedAt: string;
  UpdatedAt: string;
}
