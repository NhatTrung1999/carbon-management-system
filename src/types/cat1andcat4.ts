export interface ICat1AndCat4Data {
  No: number;
  PurDate: string;
  RKDate: string;
  PurNo: string;
  ReceivedNo: string;
  MatID: string;
  MatName: string;
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

export interface ITaxFreeZoneAddress {
  ID: string;
  No: string;
  Factory: string;
  SupplierID: string;
  Country: string;
  TaxFreeZoneAddress: string;
  CreatedBy: string;
  CreatedFactory: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedFactory: string;
  UpdatedAt: string;
}

export interface IStyleAutoFill {
  Id: string;
  No: string;
  PrefixOfMatCode: string;
  Style: string;
  CreatedBy: string;
  CreatedFactory: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedFactory: string;
  UpdatedAt: string;
}

export const HEADER = [
  { name: 'cat1andcat4.no', state: 'No', sort: true },
  { name: 'cat1andcat4.factory_code', state: 'FactoryCode', sort: true },
  { name: 'cat1andcat4.pur_date', state: 'PurDate', sort: true },
  { name: 'cat1andcat4.rk_date', state: 'RKDate', sort: true },
  { name: 'cat1andcat4.purchase_order', state: 'PurNo', sort: true },
  { name: 'cat1andcat4.received_no', state: 'ReceivedNo', sort: true },
  { name: 'cat1andcat4.material_no', state: 'MatID', sort: true },
  { name: 'cat1andcat4.qty_receive', state: 'QtyReceive', sort: true },
  { name: 'cat1andcat4.unit_weight', state: 'UnitWeight', sort: true },
  { name: 'cat1andcat4.weight', state: 'Weight_Unitkg', sort: true },
  { name: 'cat1andcat4.supplier_code', state: 'SupplierCode', sort: true },
  { name: 'cat1andcat4.style', state: 'Style', sort: true },
  {
    name: 'dataHRCollecMod.transport_method',
    state: 'TransportationMethod',
    sort: true,
  },
  { name: 'cat1andcat4.departure', state: 'Departure', sort: true },
  {
    name: 'cat1andcat4.third_country_land_transport',
    state: 'ThirdCountryLandTransport',
    sort: true,
  },
  {
    name: 'cat1andcat4.port_of_departure',
    state: 'PortOfDeparture',
    sort: true,
  },
  { name: 'cat1andcat4.port_of_arrival', state: 'PortOfArrival', sort: true },
  {
    name: 'cat1andcat4.factory_domestic_land_transport_b',
    state: 'FactoryDomesticLandTransport',
    sort: true,
  },
  { name: 'cat1andcat4.destination', state: 'Destination', sort: true },
  {
    name: 'cat1andcat4.land_transport_distance_a_b',
    state: 'LandTransportDistance',
    sort: true,
  },
  {
    name: 'cat1andcat4.sea_transport_distance',
    state: 'SeaTransportDistance',
    sort: true,
  },
  {
    name: 'cat1andcat4.air_transport_distance',
    state: 'AirTransportDistance',
    sort: true,
  },
  {
    name: 'cat1andcat4.land_transport_ton_km',
    state: 'LandTransportTonKilometers',
    sort: true,
  },
  {
    name: 'cat1andcat4.sea_transport_ton_kilometers',
    state: 'SeaTransportTonKilometers',
    sort: true,
  },
  {
    name: 'cat1andcat4.air_transport_ton_km',
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

export const HEADER_TAX_FREE_ZONE_ADDRESS = [
  {
    name: 'cat1andcat4.no',
    state: 'No',
    sort: true,
  },
  {
    name: 'cat1andcat4.factory',
    state: 'Factory',
    sort: true,
  },
  {
    name: 'cat1andcat4.supplier_id',
    state: 'SupplierID',
    sort: true,
  },
  {
    name: 'cat1andcat4.country',
    state: 'Country',
    sort: true,
  },
  {
    name: 'tabs.tax_free_zone_address',
    state: 'TaxFreeZoneAddress',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_by',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_at',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'cat1andcat4.updated_by',
    state: 'UpdatedBy',
    sort: true,
  },
  {
    name: 'usermmt.updated_at',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.action',
    state: 'Action',
    sort: false,
  },
];

export const HEADER_STYLE_AUTO_FILL = [
  {
    name: 'cat1andcat4.no',
    state: 'No',
    sort: true,
  },
  {
    name: 'cat1andcat4.prefix_mat_code',
    state: 'PrefixOfMatCode',
    sort: true,
  },
  {
    name: 'cat1andcat4.style',
    state: 'Style',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_by',
    state: 'CreatedBy',
    sort: true,
  },
  {
    name: 'cat1andcat4.created_at',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'cat1andcat4.updated_by',
    state: 'UpdatedBy',
    sort: true,
  },
  {
    name: 'usermmt.updated_at',
    state: 'UpdatedAt',
    sort: true,
  },
  {
    name: 'dataHRCollecMod.action',
    state: 'Action',
    sort: false,
  },
];
