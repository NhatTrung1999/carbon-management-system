export interface ICat1AndCat4Data {
  No: number;
  PurDate: string;
  RKDate: string;
  PurNo: string;
  ReceivedNo: string;
  MatID: string;
  MatName: string;
  Qty_Usage: number;
  Qty_Receive: number;
  UnitWeight: number;
  Weight_Unitkg: number;
  SupplierCode: string;
  FactoryCode: string;
  Style: string;
  Transportationmethod: string;
  Departure: string;
  ThirdCountryLandTransport: string;
  PortOfDeparture: string;
  PortOfArrival: string;
  FactoryDomesticLandTransport: string;
  Destination: string;
  LandTransportDistance: number;
  SeaTransportDistance: number;
  AirTransportDistance: number;
  LandTransportTonKilometers: number;
  SeaTransportTonKilometers: number;
  AirTransportTonKilometers: number;
}

export interface IPortCodeDataCat1AndCat4 {
  Id: string;
  SupplierID: string;
  SupplierName: string;
  TWSupplierName: string;
  Country: string;
  PortCode: string;
  FactoryCode: string;
  TransportMethod: string;
  CreatedBy: string;
  CreatedFactory: string;
  CreatedDate: string;
  UpdatedBy: string;
  UpdatedFactory: string;
  UpdatedDate: string;
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
  { name: 'No.', state: 'No', sort: true },
  { name: 'Factory Code', state: 'FactoryCode', sort: true },
  { name: 'Pur Date', state: 'PurDate', sort: true },
  { name: 'RK Date', state: 'RKDate', sort: true },
  { name: 'Purchase Order', state: 'PurNo', sort: true },
  { name: 'Received No.', state: 'ReceivedNo', sort: true },
  { name: 'Material No', state: 'MatID', sort: true },
  { name: 'Qty.(Usage)', state: 'Qty_Usage', sort: true },
  { name: 'Qty.(Receive)', state: 'Qty_Receive', sort: true },
  { name: 'Unit Weight', state: 'UnitWeight', sort: true },
  { name: 'Weight(Unit: KG)', state: 'Weight_Unitkg', sort: true },
  { name: 'Supplier Code', state: 'SupplierCode', sort: true },
  { name: 'Style', state: 'Style', sort: true },
  { name: 'Transportation Method', state: 'Transportationmethod', sort: true },
  { name: 'Departure', state: 'Departure', sort: true },
  {
    name: 'Third-country Land Transport (A)',
    state: 'ThirdCountryLandTransport',
    sort: true,
  },
  { name: 'Port of Departure', state: 'PortOfDeparture', sort: true },
  { name: 'Port of Arrival', state: 'PortOfArrival', sort: true },
  {
    name: 'Factory (Domestic Land Transport) (B)',
    state: 'FactoryDomesticLandTransport',
    sort: true,
  },
  { name: 'Destination', state: 'Destination', sort: true },
  {
    name: 'Land Transport Distance (A+B)',
    state: 'LandTransportDistance',
    sort: true,
  },
  { name: 'Sea Transport Distance', state: 'SeaTransportDistance', sort: true },
  { name: 'Air Transport Distance', state: 'AirTransportDistance', sort: true },
  {
    name: 'Land Transport Ton-Kilometers',
    state: 'LandTransportTonKilometers',
    sort: true,
  },
  {
    name: 'Sea Transport Ton-Kilometers',
    state: 'SeaTransportTonKilometers',
    sort: true,
  },
  {
    name: 'Air Transport Ton-Kilometers',
    state: 'AirTransportTonKilometers',
    sort: true,
  },
];

export const HEADER_PORTCODE = [
  {
    name: 'Factory Code',
    state: 'FactoryCode',
    sort: true,
  },
  {
    name: 'Supplier ID',
    state: 'SupplierID',
    sort: true,
  },
  {
    name: 'Port Code',
    state: 'PortCode',
    sort: true,
  },
  {
    name: 'Transport Method',
    state: 'TransportMethod',
    sort: true,
  },
  {
    name: 'Created By',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'Created Date',
    state: 'CreatedDate',
    sort: true,
  },
];
