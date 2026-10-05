export interface ICat9AndCat12Data {
  No: number;
  Date: string;
  RYProduct: string;
  RYComponent: string;
  ComponentName: string;
  Shipment_Date: string;
  Booking_No: string;
  Invoice_Number: string;
  Article_Name: string;
  Article_ID: string;
  Quantity: number;
  Gross_Weight: number;
  Customer_ID: string;
  Local_Land_Transportation: string;
  Port_Of_Departure: string;
  Port_Of_Arrival: string;
  Land_Transport_Distance: number;
  Sea_Transport_Distance: number;
  Air_Transport_Distance: number;
  Transport_Method: string;
  Land_Transport_Ton_Kilometers: number;
  Sea_Transport_Ton_Kilometers: number;
  Air_Transport_Ton_Kilometers: number;
}

export interface IPortCodeData {
  Id: string;
  CustomerNumber: string;
  CustomerName: string;
  TWCustomerName: string;
  Country: string;
  PortCode: string;
  TransportMethod: string;
  CreatedAt: string;
  CreatedFactory: string;
  CreatedDate: string;
  UpdatedAt: string;
  UpdatedFactory: string;
  UpdatedDate: string;
}

export const HEADER = [
  {
    name: 'cat9andcat12.no',
    state: 'No',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.invoice_date',
    state: 'Date',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.ry_product',
    state: 'RYProduct',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.ry_component',
    state: 'RYComponent',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.component_name',
    state: 'ComponentName',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.shipment_date',
    state: 'Shipment_Date',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.booking_no',
    state: 'Booking_No',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.invoice_number',
    state: 'Invoice_Number',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.article_name_style_name',
    state: 'Article_Name',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.article_id',
    state: 'Article_ID',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.quantity',
    state: 'Quantity',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.gross_weight_unit_ton',
    state: 'Gross_Weight',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.customer_id',
    state: 'Customer_ID',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.local_land_transportation_factory_port',
    state: 'Local_Land_Transportation',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.port_of_departure',
    state: 'Port_Of_Departure',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.port_of_arrival',
    state: 'Port_Of_Arrival',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.land_transport_distance',
    state: 'Land_Transport_Distance',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.sea_transport_distance',
    state: 'Sea_Transport_Distance',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.air_transport_distance',
    state: 'Air_Transport_Distance',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.transport_method',
    state: 'Transport_Method',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.land_transport_ton_kilometers',
    state: 'Land_Transport_Ton_Kilometers',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.sea_transport_ton_kilometers',
    state: 'Sea_Transport_Ton_Kilometers',
    sort: true,
    filterable: true,
  },
  {
    name: 'cat9andcat12.air_transport_ton_kilometers',
    state: 'Air_Transport_Ton_Kilometers',
    sort: true,
    filterable: true,
  },
];

export const HEADER_PORTCODE = [
  {
    name: 'cat9andcat12.customer_number',
    state: 'CustomerNumber',
    sort: true,
  },
  {
    name: 'cat9andcat12.port_code',
    state: 'PortCode',
    sort: true,
  },
  {
    name: 'cat9andcat12.transportmethod',
    state: 'TransportMethod',
    sort: true,
  },
  {
    name: 'cat9andcat12.created_at',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'cat9andcat12.created_date',
    state: 'CreatedDate',
    sort: true,
  },
];
