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
        name: 'loggingcat7.system',
        state: 'System',
        sort: true,
    },
    {
        name: 'loggingcat7.corporation',
        state: 'Corporation',
        sort: true,
    },
    {
        name: 'loggingcat7.factory',
        state: 'Factory',
        sort: true,
    },
    {
        name: 'loggingcat7.department',
        state: 'Department',
        sort: true,
    },
    {
        name: 'loggingcat7.dockey',
        state: 'DocKey',
        sort: true,
    },
    {
        name: 'loggingcat7.sperioddata',
        state: 'SPeriodData',
        sort: true,
    },
    {
        name: 'loggingcat7.eperioddata',
        state: 'EPeriodData',
        sort: true,
    },
    {
        name: 'loggingcat7.activitytype',
        state: 'ActivityType',
        sort: true,
    },
    {
        name: 'loggingcat7.datatype',
        state: 'DataType',
        sort: true,
    },
    {
        name: 'loggingcat7.doctype',
        state: 'DocType',
        sort: true,
    },
    {
        name: 'loggingcat7.docdate',
        state: 'DocDate',
        sort: true,
    },
    {
        name: 'loggingcat7.docdate2',
        state: 'DocDate2',
        sort: true,
    },
    {
        name: 'loggingcat7.unddocno',
        state: 'UndDocNo',
        sort: true,
    },
    {
        name: 'loggingcat7.transtyppe',
        state: 'TransType',
        sort: true,
    },
    {
        name: 'loggingcat7.departure',
        state: 'Departure',
        sort: true,
    },
    {
        name: 'loggingcat7.destination',
        state: 'Destination',
        sort: true,
    },
    {
        name: 'loggingcat7.attendance',
        state: 'Attendance',
        sort: true,
    },
    {
        name: 'loggingcat7.memo',
        state: 'Memo',
        sort: true,
    },
    {
        name: 'loggingcat7.createdatetime',
        state: 'CreateDateTime',
        sort: true,
    },
    {
        name: 'loggingcat7.creator',
        state: 'Creator',
        sort: true,
    },
    {
        name: 'loggingcat7.createduser',
        state: 'CreatedUser',
        sort: true,
    },
    {
        name: 'loggingcat7.createdfactory',
        state: 'CreatedFactory',
        sort: true,
    },
    {
        name: 'loggingcat7.createdat',
        state: 'CreatedAt',
        sort: true,
    },
];
