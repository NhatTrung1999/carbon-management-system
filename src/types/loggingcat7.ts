export interface ILoggingCat7Data {
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
    DocDate: string;
    DocDate2: string;
    UndDocNo: string;
    TransType: string;
    Departure: string;
    Destination: string;
    Attendance: string;
    Memo: string;
    CreateDateTime: string;
    Creator: string;
    CreatedUser: string;
    CreatedFactory: string;
    CreatedAt: string;
}

export const HEADER: { name: string; state: string; sort: boolean }[] = [
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
        name: 'UndDoc No',
        state: 'UndDocNo',
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
        name: 'Attendance',
        state: 'Attendance',
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
];
