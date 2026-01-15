export const HEADER = [
  {
    name: 'ID',
    state: 'ID',
    sort: true,
  },
  {
    name: 'Full Name',
    state: 'FullName',
    sort: true,
  },
  {
    name: 'Department',
    state: 'Department',
    sort: true,
  },
  {
    name: 'Join Date',
    state: 'JoinDate',
    sort: true,
  },
  {
    name: 'Permanent Address',
    state: 'PermanentAddress',
    sort: true,
  },
  {
    name: 'Current Address',
    state: 'CurrentAddress',
    sort: true,
  },
  {
    name: 'Transportation Method',
    state: 'TransportationMethod',
    sort: true,
  },
  {
    name: 'Number of Working Days',
    state: 'NumberOfWorkingDays',
    sort: true,
  },
  {
    name: 'Action',
    state: 'Action',
    sort: false,
  },
];

export interface IHRModule {
  ID: string;
  Department: string;
  FullName: string;
  JoinDate: string;
  PermanentAddress: string;
  CurrentAddress: string;
  TransportationMethod: string;
  Number_of_Working_Days: string;
}

// export const mockHRData: IHRModule[] = [
//   {
//     ID: 'NV-1001',
//     Department: 'Phòng Kỹ thuật (IT)',
//     FullName: 'Nguyễn Văn An',
//     PermanentAddress: 'Xã Hòa Liên, Huyện Hòa Vang, TP. Đà Nẵng',
//     CurrentAddress: 'Số 12, Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
//     TransportationMode: 'Xe máy',
//     Number_of_Working_Days: '22',
//   },
//   {
//     ID: 'NV-1002',
//     Department: 'Phòng Nhân sự (HR)',
//     FullName: 'Trần Thị Bích',
//     PermanentAddress: 'Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
//     CurrentAddress: 'Tòa nhà Keangnam, Phạm Hùng, Hà Nội',
//     TransportationMode: 'Xe buýt',
//     Number_of_Working_Days: '20.5',
//   },
//   {
//     ID: 'NV-1003',
//     Department: 'Phòng Kinh doanh (Sales)',
//     FullName: 'Lê Hoàng Nam',
//     PermanentAddress: 'Thị trấn Long Thành, Huyện Long Thành, Đồng Nai',
//     CurrentAddress: 'Chung cư Masteri, Thảo Điền, TP. Thủ Đức',
//     TransportationMode: 'Ô tô cá nhân',
//     Number_of_Working_Days: '24',
//   },
//   {
//     ID: 'NV-1004',
//     Department: 'Phòng Marketing',
//     FullName: 'Phạm Minh Tú',
//     PermanentAddress: 'Phường 5, TP. Đà Lạt, Lâm Đồng',
//     CurrentAddress: 'Số 45, Đường Nguyễn Thị Minh Khai, Quận 3, TP. HCM',
//     TransportationMode: 'Grab/Taxi',
//     Number_of_Working_Days: '21',
//   },
//   {
//     ID: 'NV-1005',
//     Department: 'Phòng Kế toán',
//     FullName: 'Hoàng Thu Thảo',
//     PermanentAddress: 'Thôn 3, Xã Cẩm Thanh, TP. Hội An, Quảng Nam',
//     CurrentAddress: 'Đường 2/9, Quận Hải Châu, TP. Đà Nẵng',
//     TransportationMode: 'Xe máy',
//     Number_of_Working_Days: '23',
//   },
// ];
