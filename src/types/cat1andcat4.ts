export interface ICat1AndCat4Data {
  No: number;
  Date: string;
  Purchase_Order: string;
  Material_No: string;
  Weight: number;
  Supplier_Code: string;
  Thirdcountry_Land_Transport: string;
  Port_Of_Departure: string;
  Port_Of_Arrival: string;
  Factory_Domestic_Land_Transport: string;
  Land_Transport_Distance: number;
  Sea_Transport_Distance: string;
  Air_Transport_Distance: number;
  Land_Transport_Ton_Kilometers: number;
  Sea_Transport_Ton_Kilometers: number;
  Air_Transport_Ton_Kilometers: number;
}

export const HEADER = [
  {
    name: 'No.',
    state: 'No',
    sort: true,
  },
  {
    name: 'Date',
    state: 'Date',
    sort: true,
  },
  {
    name: 'Purchase Order',
    state: 'Purchase_Order',
    sort: true,
  },
  {
    name: 'Material No.',
    state: 'Material_No',
    sort: true,
  },
  {
    name: 'Weight (Unit: Ton)',
    state: 'Weight',
    sort: true,
  },
  {
    name: 'Supplier Code',
    state: 'Supplier_Code',
    sort: true,
  },
  {
    name: 'Third-country Land Transport (A)',
    state: 'Thirdcountry_Land_Transport',
    sort: true,
  },
  {
    name: 'Port of Departure',
    state: 'Port_Of_Departure',
    sort: true,
  },
  {
    name: 'Port of Arrival',
    state: 'Port_Of_Arrival',
    sort: true,
  },
  {
    name: 'Factory (Domestic Land Transport) (B)',
    state: 'Factory_Domestic_Land_Transport',
    sort: true,
  },
  {
    name: 'Land Transport Distance (A+B)',
    state: 'Land_Transport_Distance',
    sort: true,
  },
  {
    name: 'Sea Transport Distance',
    state: 'Sea_Transport_Distance',
    sort: true,
  },
  {
    name: 'Air Transport Distance',
    state: 'Air_Transport_Distance',
    sort: true,
  },
  {
    name: 'Land Transport Ton-Kilometers',
    state: 'Land_Transport_Ton_Kilometers',
    sort: true,
  },
  {
    name: 'Sea Transport Ton-Kilometers',
    state: 'Sea_Transport_Ton_Kilometers',
    sort: true,
  },
  {
    name: 'Air Transport Ton-Kilometers',
    state: 'Air_Transport_Ton_Kilometers',
    sort: true,
  },
];
