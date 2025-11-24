// import { useAppSelector } from '../../../app/hooks';

// interface IBody {
//   UserID: string;
//   FullName: string;
//   Email: string;
//   Permission: string;
//   Status: string;
//   CreatedAt: string;
//   CreatedDate: string;
//   UpdatedAt: string;
//   UpdatedDate: string;
// }

// const header: string[] = [
//   'UserID',
//   'Name',
//   'Email',
//   'Role',
//   'Status',
//   'CreatedAt',
//   'CreatedDate',
//   'UpdatedAt',
//   'UpdatedDate',
// ];

// interface Props {
// activeRow: string | null;
// setActiveRow: (value: string | null) => void;
//   setItem: (value: any) => void;
// }

// const Table = ({ activeRow, setActiveRow, setItem }: Props) => {
//   // const [activeRow, setActiveRow] = useState<number | null>(null);
//   const { users } = useAppSelector((state) => state.user);

//   return (
//     <div className="max-h-[600px] overflow-y-auto">
//       <table className="w-full text-left min-w-max">
//         <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
//           <tr>
//             {header.map((item, index) => (
//               <th className="px-6 py-6" key={index}>
//                 {item}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((data: any, index) => (
//             <tr
//               key={index}
//               className={`cursor-pointer ${
//                 activeRow === data.ID ? 'bg-[#a7baa4] text-white' : ''
//               }`}
//               onClick={() => {
//                 setActiveRow(data.ID === activeRow ? null : data.ID);
//                 setItem(data)
//               }}
//             >
//               {header.map((item, indexx) => (
//                 <td
//                   className="px-6 py-4 border-b border-b-gray-200"
//                   key={indexx}
//                 >
//                   {data[item]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import type { TableHeaderProps } from '../../../types/table';
// import type { IUserManagement } from '../../../types/usermanagement';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { formatDate } from '../../../utils/formatDate';
import type { IUserManagement } from '../../../types/users';
import { useTranslation } from 'react-i18next';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: IUserManagement[];
  activeRow: string | null;
  setActiveRow: (value: string | null) => void;
  setItem: (value: IUserManagement) => void;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  activeRow,
  setActiveRow,
  setItem,
}: Props) => {
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };
  const {t} = useTranslation()

  const renderSortIcon = (item: TableHeaderProps) =>
    item.state !== 'Action' && (
      <div className="flex flex-col ml-1">
        <TiArrowSortedUp
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'desc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'desc')}
        />
      </div>
    );


  return (
    <div className="max-h-[600px] overflow-y-auto">
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => (
              <th className="px-4 py-4 whitespace-break-spaces" key={index}>
                <div className="flex flex-row gap-6 items-center">
                  <span>{t(item.name)}</span>
                  {item.sort && (
                    <span className="flex flex-col cursor-pointer">
                      {renderSortIcon(item)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={header.length}
                className="text-center box-border px-6 py-6"
              >
                No data
              </td>
            </tr>
          ) : (
            <>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    activeRow === item.ID ? 'bg-[#a7baa4] text-white' : ''
                  }`}
                  onClick={() => {
                    setActiveRow(item.ID === activeRow ? null : item.ID);
                    setItem(item);
                  }}
                >
                  <td className="box-border px-4 py-4">{item.UserID}</td>
                  <td className="box-border px-4 py-4">{item.Name}</td>
                  <td className="box-border px-4 py-4">{item.Email}</td>
                  <td className="box-border px-4 py-4">{item.Role}</td>
                  <td className="box-border px-4 py-4">{item.Status}</td>
                  <td className="box-border px-4 py-4">{item.CreatedAt}</td>
                  <td className="box-border px-4 py-4">{formatDate(item.CreatedDate)}</td>
                  <td className="box-border px-4 py-4">{item.UpdatedAt}</td>
                  <td className="box-border px-4 py-4">{formatDate(item.UpdatedDate)}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
