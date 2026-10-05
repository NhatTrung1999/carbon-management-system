import type { TableHeaderProps } from './table';

// Log rows written after sending Cat 1&4, Cat 5 and Cat 9&12 data to CMS.
// All three share the same columns.

export interface ILoggingCMSData {
  System: string;
  Corporation: string;
  Factory: string;
  Department: string;
  DocKey: string;
  SPeriodData: string;
  EPeriodData: string;
  ActivityType: string;
  DataType: string;
  DocType: string;
  UndDoc: string;
  DocFlow: string;
  DocDate: string;
  DocDate2: string;
  DocNo: string;
  UndDocNo: string;
  CustVenName: string;
  InvoiceNo: string;
  TransType: string;
  Departure: string;
  Destination: string;
  PortType: string;
  StPort: string;
  ThPort: string;
  EndPort: string;
  Product: string;
  Quity: string;
  Amount: string;
  ActivityData: string;
  ActivityUnit: string;
  Unit: string;
  UnitWeight: string;
  Memo: string;
  CreateDateTime: string;
  Creator: string;
  CreatedUser: string;
  CreatedFactory: string;
  CreatedAt: string;
  ActivitySource: string;
}

export const HEADER_LOGGING_CMS: TableHeaderProps[] = [
  {
    name: 'System',
    state: 'System',
    sort: true,
  },
  {
    name: 'Corporation',
    state: 'Corporation',
    sort: true,
  },
  {
    name: 'Factory',
    state: 'Factory',
    sort: true,
  },
  {
    name: 'Department',
    state: 'Department',
    sort: true,
  },
  {
    name: 'Document Key',
    state: 'DocKey',
    sort: true,
  },
  {
    name: 'SPeriod Data',
    state: 'SPeriodData',
    sort: true,
  },
  {
    name: 'EPeriod Data',
    state: 'EPeriodData',
    sort: true,
  },
  {
    name: 'Activity Type',
    state: 'ActivityType',
    sort: true,
  },
  {
    name: 'Data Type',
    state: 'DataType',
    sort: true,
  },
  {
    name: 'Document Type',
    state: 'DocType',
    sort: true,
  },
  {
    name: 'Und Doc',
    state: 'UndDoc',
    sort: true,
  },
  {
    name: 'Document Flow',
    state: 'DocFlow',
    sort: true,
  },
  {
    name: 'Document Date',
    state: 'DocDate',
    sort: true,
  },
  {
    name: 'Document Date 2',
    state: 'DocDate2',
    sort: true,
  },
  {
    name: 'Document No',
    state: 'DocNo',
    sort: true,
  },
  {
    name: 'UndDoc No',
    state: 'UndDocNo',
    sort: true,
  },
  {
    name: 'Customer Vendor Name',
    state: 'CustVenName',
    sort: true,
  },
  {
    name: 'Invoice No',
    state: 'InvoiceNo',
    sort: true,
  },
  {
    name: 'Transportation Type',
    state: 'TransType',
    sort: true,
  },
  {
    name: 'Departure',
    state: 'Departure',
    sort: true,
  },
  {
    name: 'Destination',
    state: 'Destination',
    sort: true,
  },
  {
    name: 'Port Type',
    state: 'PortType',
    sort: true,
  },
  {
    name: 'St Port',
    state: 'StPort',
    sort: true,
  },
  {
    name: 'Th Port',
    state: 'ThPort',
    sort: true,
  },
  {
    name: 'End Port',
    state: 'EndPort',
    sort: true,
  },
  {
    name: 'Product',
    state: 'Product',
    sort: true,
  },
  {
    name: 'Quity',
    state: 'Quity',
    sort: true,
  },
  {
    name: 'Amount',
    state: 'Amount',
    sort: true,
  },
  {
    name: 'Activity Data',
    state: 'ActivityData',
    sort: true,
  },
  {
    name: 'Activity Unit',
    state: 'ActivityUnit',
    sort: true,
  },
  {
    name: 'Unit',
    state: 'Unit',
    sort: true,
  },
  {
    name: 'Unit Weight',
    state: 'UnitWeight',
    sort: true,
  },
  {
    name: 'Memo',
    state: 'Memo',
    sort: true,
  },
  {
    name: 'Created Date Time',
    state: 'CreateDateTime',
    sort: true,
  },
  {
    name: 'Creator',
    state: 'Creator',
    sort: true,
  },
  {
    name: 'Created User',
    state: 'CreatedUser',
    sort: true,
  },
  {
    name: 'Created Factory',
    state: 'CreatedFactory',
    sort: true,
  },
  {
    name: 'Created At',
    state: 'CreatedAt',
    sort: true,
  },
  {
    name: 'Activity Source',
    state: 'ActivitySource',
    sort: true,
  },
];

// ── Payloads sent to logcat/create-log-* ────────────────────────────────────

export interface ILogCat1AndCat4Payload {
  System: string;
  Corporation: string;
  Factory: string;
  Department: string;
  DocKey: string;
  SPeriodData: string;
  EPeriodData: string;
  ActivityType: string;
  DataType: string;
  DocType: string;
  UndDoc: string;
  DocFlow: string;
  DocDate: string;
  DocDate2: string;
  DocNo: string;
  UndDocNo: string;
  CustVenName: string;
  InvoiceNo: string;
  TransType: string;
  Departure: string;
  Destination: string;
  PortType: string;
  StPort: string;
  ThPort: string;
  EndPort: string;
  Product: string;
  Quity: string;
  Amount: string;
  ActivityData: number;
  ActivityUnit: string;
  Unit: string;
  UnitWeight: string;
  Memo: string;
  CreateDateTime: string;
  Creator: string;
}

export type ILogCat5Payload = ILogCat1AndCat4Payload & {
  AccNo: string;
  AccName: string;
  ActivitySource: string;
};

export type ILogCat9AndCat12Payload = Omit<ILogCat1AndCat4Payload, 'Quity'> & {
  Quity: number;
  ActivitySource: string;
};
