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

// export const HEADER = [
//   {
//     name: 'cat1andcat4.no',
//     state: 'No',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.date',
//     state: 'Date',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.purchase_order',
//     state: 'Purchase_Order',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.material_no',
//     state: 'Material_No',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.weight',
//     state: 'Weight',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.supplier_code',
//     state: 'Supplier_Code',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.third_country_land_transport',
//     state: 'Thirdcountry_Land_Transport',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.port_of_departure',
//     state: 'Port_Of_Departure',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.port_of_arrival',
//     state: 'Port_Of_Arrival',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.factory_domestic_land_transport_b',
//     state: 'Factory_Domestic_Land_Transport',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.land_transport_distance_a_b',
//     state: 'Land_Transport_Distance',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.sea_transport_distance',
//     state: 'Sea_Transport_Distance',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.air_transport_distance',
//     state: 'Air_Transport_Distance',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.land_transport_ton_kilometers',
//     state: 'Land_Transport_Ton_Kilometers',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.sea_transport_ton_kilometers',
//     state: 'Sea_Transport_Ton_Kilometers',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.air_transport_ton_kilometers',
//     state: 'Air_Transport_Ton_Kilometers',
//     sort: true,
//   },
// ];

export const HEADER = [
  {
    name: 'No.',
    state: 'No',
    sort: true,
  },
  {
    name: 'Pur Date',
    state: 'PurDate',
    sort: true,
  },
  {
    name: 'RK Date',
    state: 'RKDate',
    sort: true,
  },
  {
    name: 'Purchase Order',
    state: 'PurchaseOrder',
    sort: true,
  },
  {
    name: 'Received No.',
    state: 'ReceivedNo',
    sort: true,
  },
  {
    name: 'Material No',
    state: 'MaterialNo',
    sort: true,
  },
  {
    name: 'Qty.',
    state: 'Qty',
    sort: true,
  },
  {
    name: 'Weight(Unit: KG)',
    state: 'Weight',
    sort: true,
  },
  {
    name: 'Supplier Code',
    state: 'SupplierCode',
    sort: true,
  },
  {
    name: 'Style',
    state: 'Style',
    sort: true,
  },
  {
    name: 'Transportation Method',
    state: 'TransportationMethod',
    sort: true,
  },
  {
    name: 'Departure',
    state: 'Departure',
    sort: true,
  },
  {
    name: 'Third-country Land Transport (A)',
    state: 'ThirdcountryLandTransportA',
    sort: true,
  },
  {
    name: 'Port of Departure',
    state: 'PortofDeparture',
    sort: true,
  },
  {
    name: 'Port of Arrival',
    state: 'PortofArrival',
    sort: true,
  },
  {
    name: 'Factory (Domestic Land Transport) (B)',
    state: 'FactoryDomesticLandTransportB',
    sort: true,
  },
  {
    name: 'Destination',
    state: 'Destination',
    sort: true,
  },
  {
    name: 'Land Transport Distance (A+B)',
    state: 'LandTransportDistanceAB',
    sort: true,
  },
  {
    name: 'Sea Transport Distance',
    state: 'SeaTransportDistance',
    sort: true,
  },
  {
    name: 'Air Transport Distance',
    state: 'AirTransportDistance',
    sort: true,
  },
  {
    name: 'Land Transport Ton-Kilometers',
    state: 'LandTransortTonKilometers',
    sort: true,
  },
  {
    name: 'Sea Transport Ton-Kilometers',
    state: 'SeaTransortTonKilometers',
    sort: true,
  },
  {
    name: 'Air Transport Ton-Kilometers',
    state: 'AirTransortTonKilometers',
    sort: true,
  },
];