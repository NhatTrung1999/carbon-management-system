import { useTranslation } from 'react-i18next';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState, type RefObject, type UIEventHandler } from 'react';
import { useAppSelector } from '../../../app/hooks';
import CommonTable, { Td } from '../../common/Table';
import { ActionBtn, EditInput, EditSelect } from '../../common/TableControls';
import type { TableHeaderProps, SortState } from '../../../types/table';
import type { IHRModule } from '../../../types/hrmodule';
import { formatDate } from '../../../utils/formatDate';

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: IHRModule[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onSave: (item: IHRModule) => void;
};

const TRANSPORT_OPTIONS = [
  'Walking',
  'Bicycle',
  'Electric motorcycle',
  'Motorcycle',
  'Electric car',
  'Car',
  'Bus',
  'Company shuttle bus',
];

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  onSave,
}: Props) => {
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.hrmodule.list);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<IHRModule | null>(null);

  const handleEdit = (item: IHRModule) => {
    setEditingId(item.ID);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (editFormData)
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!editFormData) return;
    onSave(editFormData);
    handleCancel();
  };

  return (
    <CommonTable
      header={header}
      data={data}
      loading={loading}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      tableRef={tableRef}
      onScroll={onScroll}
      headerClassName="bg-[#636e61] backdrop-blur-md"
      rowClassName={(item) =>
        editingId === item.ID ? 'bg-emerald-400/[0.04]' : undefined
      }
      renderRow={(item) => {
        const isEditing = editingId === item.ID;
        return (
          <>
            <Td>{item.ID}</Td>
            <Td>{item.FullName}</Td>
            <Td>{item.Department}</Td>
            <Td>{formatDate(item.JoinDate)}</Td>
            <Td>{item.PermanentAddress}</Td>
            <Td>
              {isEditing ? (
                <EditInput
                  name="CurrentAddress"
                  value={editFormData?.CurrentAddress ?? ''}
                  onChange={handleInputChange}
                />
              ) : (
                item.CurrentAddress
              )}
            </Td>
            <Td>
              {isEditing ? (
                <EditSelect
                  name="TransportationMethod"
                  value={editFormData?.TransportationMethod ?? ''}
                  options={TRANSPORT_OPTIONS}
                  onChange={handleInputChange}
                />
              ) : (
                item.TransportationMethod
              )}
            </Td>
            <Td>{item.BusRoute}</Td>
            <Td>{item.BusStation}</Td>
            <Td>{item.PickUpPoint}</Td>
            <Td>{item.Number_of_Working_Days}</Td>
            <Td>
              <div className="flex items-center justify-center gap-1.5">
                {isEditing ? (
                  <>
                    <ActionBtn
                      title={t('common.save')}
                      tone="emerald"
                      onClick={handleSave}
                    >
                      <FaSave size={13} />
                    </ActionBtn>
                    <ActionBtn
                      title={t('common.cancel')}
                      tone="red"
                      onClick={handleCancel}
                    >
                      <FaTimes size={13} />
                    </ActionBtn>
                  </>
                ) : (
                  <ActionBtn
                    title={t('common.edit')}
                    tone="blue"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit size={13} />
                  </ActionBtn>
                )}
              </div>
            </Td>
          </>
        );
      }}
    />
  );
};

export default Table;
