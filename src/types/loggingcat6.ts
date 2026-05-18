export interface ILoggingCat6BusinessTravelData {
  ID: string;
  System: string;
  Corporation: string;
  Factory: string;
  Fac: string;
  Department: string;
  DocKey: string;
  ActivitySource: string;
  SPeriodData: string;
  EPeriodData: string;
  ActivityType: string;
  DataType: string;
  DocType: string;
  DocDate: string;
  DocDate2: string;
  DocNo: string;
  UndDocNo: string;
  TransType: string;
  Departure: string;
  Destination: string;
  Memo: string;
  CreateDateTime: string;
  Creator: string;
  CreatedUser: string;
  CreatedFactory: string;
  CreatedAt: string;
}

export interface ILoggingCat6Accommodation {
  ID: string;
  System: string;
  Corporation: string;
  Factory: string;
  Fac: string;
  Department: string;
  DocKey: string;
  ActivitySource: string;
  SPeriodData: string;
  EPeriodData: string;
  ActivityType: string;
  DataType: string;
  DocType: string;
  DocDate: string;
  DocDate2: string;
  DocNo: string;
  UndDocNo: string;
  TransType: string;
  ActivityData: string;
  Memo: string;
  CreateDateTime: string;
  Creator: string;
  CreatedUser: string;
  CreatedFactory: string;
  CreatedAt: string;
}

export const HEADER_BUSINESS_TRAVEL: {
  name: string;
  state: string;
  sort: boolean;
}[] = [
  { name: 'System', state: 'System', sort: true },
  { name: 'Corporation', state: 'Corporation', sort: true },
  { name: 'Factory', state: 'Factory', sort: true },
  { name: 'Fac', state: 'Fac', sort: true },
  { name: 'Department', state: 'Department', sort: true },
  { name: 'DocKey', state: 'DocKey', sort: true },
  { name: 'ActivitySource', state: 'ActivitySource', sort: true },
  { name: 'SPeriodData', state: 'SPeriodData', sort: true },
  { name: 'EPeriodData', state: 'EPeriodData', sort: true },
  { name: 'ActivityType', state: 'ActivityType', sort: true },
  { name: 'DataType', state: 'DataType', sort: true },
  { name: 'DocType', state: 'DocType', sort: true },
  { name: 'DocDate', state: 'DocDate', sort: true },
  { name: 'DocDate2', state: 'DocDate2', sort: true },
  { name: 'DocNo', state: 'DocNo', sort: true },
  { name: 'UndDocNo', state: 'UndDocNo', sort: true },
  { name: 'TransType', state: 'TransType', sort: true },
  { name: 'Departure', state: 'Departure', sort: true },
  { name: 'Destination', state: 'Destination', sort: true },
  { name: 'Memo', state: 'Memo', sort: true },
  { name: 'CreateDateTime', state: 'CreateDateTime', sort: true },
  { name: 'Creator', state: 'Creator', sort: true },
  { name: 'CreatedUser', state: 'CreatedUser', sort: true },
  { name: 'CreatedFactory', state: 'CreatedFactory', sort: true },
  { name: 'CreatedAt', state: 'CreatedAt', sort: true },
];

export const HEADER_ACCOMMODATION: {
  name: string;
  state: string;
  sort: boolean;
}[] = [
  { name: 'System', state: 'System', sort: true },
  { name: 'Corporation', state: 'Corporation', sort: true },
  { name: 'Factory', state: 'Factory', sort: true },
  { name: 'Fac', state: 'Fac', sort: true },
  { name: 'Department', state: 'Department', sort: true },
  { name: 'DocKey', state: 'DocKey', sort: true },
  { name: 'ActivitySource', state: 'ActivitySource', sort: true },
  { name: 'SPeriodData', state: 'SPeriodData', sort: true },
  { name: 'EPeriodData', state: 'EPeriodData', sort: true },
  { name: 'ActivityType', state: 'ActivityType', sort: true },
  { name: 'DataType', state: 'DataType', sort: true },
  { name: 'DocType', state: 'DocType', sort: true },
  { name: 'DocDate', state: 'DocDate', sort: true },
  { name: 'DocDate2', state: 'DocDate2', sort: true },
  { name: 'DocNo', state: 'DocNo', sort: true },
  { name: 'UndDocNo', state: 'UndDocNo', sort: true },
  { name: 'TransType', state: 'TransType', sort: true },
  { name: 'ActivityData', state: 'ActivityData', sort: true },
  { name: 'Memo', state: 'Memo', sort: true },
  { name: 'CreateDateTime', state: 'CreateDateTime', sort: true },
  { name: 'Creator', state: 'Creator', sort: true },
  { name: 'CreatedUser', state: 'CreatedUser', sort: true },
  { name: 'CreatedFactory', state: 'CreatedFactory', sort: true },
  { name: 'CreatedAt', state: 'CreatedAt', sort: true },
];
