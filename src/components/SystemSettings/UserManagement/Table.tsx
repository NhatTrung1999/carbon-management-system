import { useAppSelector } from '../../../app/hooks';

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

const header: string[] = [
  'UserID',
  'Name',
  'Email',
  'Role',
  'Status',
  'CreatedAt',
  'CreatedDate',
  'UpdatedAt',
  'UpdatedDate',
];

interface Props {
  activeRow: string | null;
  setActiveRow: (value: string | null) => void;
  setItem: (value: any) => void;
}

const Table = ({ activeRow, setActiveRow, setItem }: Props) => {
  // const [activeRow, setActiveRow] = useState<number | null>(null);
  const { users } = useAppSelector((state) => state.user);

  return (
    <div className="max-h-[600px] overflow-y-auto">
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => (
              <th className="px-6 py-6" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((data: any, index) => (
            <tr
              key={index}
              className={`cursor-pointer ${
                activeRow === data.ID ? 'bg-[#a7baa4] text-white' : ''
              }`}
              onClick={() => {
                setActiveRow(data.ID === activeRow ? null : data.ID);
                setItem(data)
              }}
            >
              {header.map((item, indexx) => (
                <td
                  className="px-6 py-4 border-b border-b-gray-200"
                  key={indexx}
                >
                  {data[item]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
