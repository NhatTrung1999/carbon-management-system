export interface ICat1AndCat4Data {
  No: number;
  PurDate: string;
  RKDate: string;
  PurNo: string;
  ReceivedNo: string;
  MatID: string;
  MatName: string;
  QtyUsage: number;
  QtyReceive: number;
  UnitWeight: number;
  WeightUnitkg: number;
  SupplierCode: string;
  FactoryCode: string;
  Style: string;
  TransportationMethod: string;
  Departure: string;
  ThirdCountryLandTransport: string;
  PortOfDeparture: string;
  PortOfArrival: string;
  FactoryDomesticLandTransport: string;
  Destination: string;
  LandTransportDistance: string;
  SeaTransportDistance: string;
  AirTransportDistance: string;
  LandTransportTonKilometers: string;
  SeaTransportTonKilometers: string;
  AirTransportTonKilometers: string;
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

// export const HEADER = [
//   {
//     name: 'cat1andcat4.no',
//     state: 'No',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.date',
//     state: 'PurDate',
//     sort: true,
//   },
//   {
//     name: 'RK Date',
//     state: 'RKDate',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.purchase_order',
//     state: 'PurchaseOrder',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.received_no',
//     state: 'ReceivedNo',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.material_no',
//     state: 'MaterialNo',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.qty_usage',
//     state: 'QtyUsage',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.qty_receive',
//     state: 'QtyReceive',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.unit_weight',
//     state: 'UnitWeight',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.weight',
//     state: 'Weight',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.supplier_code',
//     state: 'SupplierCode',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.factory_code',
//     state: 'FactoryCode',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.style',
//     state: 'Style',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.transport_method',
//     state: 'TransportationMethod',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.departure',
//     state: 'Departure',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.third_country_land_transport',
//     state: 'ThirdcountryLandTransportA',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.port_of_departure',
//     state: 'PortofDeparture',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.port_of_arrival',
//     state: 'PortofArrival',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.factory_domestic_land_transport_b',
//     state: 'FactoryDomesticLandTransportB',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.destination',
//     state: 'Destination',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.land_transport_distance_a_b',
//     state: 'LandTransportDistanceAB',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.sea_transport_distance',
//     state: 'SeaTransportDistance',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.air_transport_distance',
//     state: 'AirTransportDistance',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.land_transport_ton_kilometers',
//     state: 'LandTransportTonKilometers',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.sea_transport_ton_kilometers',
//     state: 'SeaTransportTonKilometers',
//     sort: true,
//   },
//   {
//     name: 'cat1andcat4.air_transport_ton_kilometers',
//     state: 'AirTransportTonKilometers',
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
  { name: 'Material No.', state: 'MatID', sort: true },
  { name: 'Qty.(Usage)', state: 'QtyUsage', sort: true },
  { name: 'Qty.(receive)', state: 'QtyReceive', sort: true },
  { name: 'Unit weight', state: 'UnitWeight', sort: true },
  { name: 'Weight (Unit：KG)', state: 'Weight_Unitkg', sort: true },
  { name: 'Supplier Code', state: 'SupplierCode', sort: true },
  { name: 'Style', state: 'Style', sort: true },
  { name: 'Transportation Method', state: 'TransportationMethod', sort: true },
  { name: 'Departure', state: 'Departure', sort: true },
  {
    name: 'Third-country Land Transport (A)',
    state: 'ThirdCountryLandTransport',
    sort: true,
  },
  { name: 'Port of Departure', state: 'PortOfDeparture', sort: true },
  { name: 'Port of Arrival', state: 'PortOfArrival', sort: true },
  {
    name: 'Factory (Domestic Land Transport)(B)',
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
  { name: 'Air Transport Distanc', state: 'AirTransportDistance', sort: true },
  {
    name: 'Land Transport Ton-Kilometer',
    state: 'LandTransportTonKilometers',
    sort: true,
  },
  {
    name: 'Sea Transport Ton-Kilometers',
    state: 'SeaTransportTonKilometers',
    sort: true,
  },
  {
    name: '	Air Transport Ton-Kilomete',
    state: 'AirTransportTonKilometers',
    sort: true,
  },
];

export const HEADER_PORTCODE = [
  {
    name: 'cat1andcat4.factory_code',
    state: 'FactoryCode',
    sort: true,
  },
  {
    name: 'cat1andcat4.supplier_id',
    state: 'SupplierID',
    sort: true,
  },
  {
    name: 'cat1andcat4.port_code',
    state: 'PortCode',
    sort: true,
  },
  {
    name: 'cat1andcat4.transport_method',
    state: 'TransportMethod',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_by',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_date',
    state: 'CreatedDate',
    sort: true,
  },
];
