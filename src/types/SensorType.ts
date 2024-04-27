export interface Location {
  id: number;
  latitude: string;
  longitude: string;
  altitude: string;
  country: string;
  exact_location: number;
  indoor: number;
}

export interface SensorType {
  id: number;
  name: string;
  manufacturer: string;
}

export interface Sensor {
  id: number;
  pin: string;
  sensor_type: SensorType;
}

export interface SensorDataValue {
  id: number;
  value: string | null;
  value_type: string;
}

export interface RootObject {
  id: number;
  sampling_rate?: any;
  timestamp: string;
  location: Location;
  sensor: Sensor;
  sensordatavalues: SensorDataValue[] | undefined;
  polygon?: any;
  color_quality: string;
}
