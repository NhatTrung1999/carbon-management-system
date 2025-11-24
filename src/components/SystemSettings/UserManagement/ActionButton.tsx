import { useTranslation } from 'react-i18next';
import Button from '../../common/Button';

interface Props {
  handleAddUser: () => void;
  handleEditUser: () => void;
  handleDeleteUser: () => void;
}

const ActionButton = ({
  handleAddUser,
  handleEditUser,
  handleDeleteUser,
}: Props) => {
  const {t} = useTranslation()
  return (
    <div className="flex items-end gap-2 justify-end">
      <Button
        label={t('main.add')}
        type="button"
        className="block text-white bg-[#1b5fe3] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
        onClick={handleAddUser}
      />
      <Button
        label={t('main.edit')}
        type="button"
        className="block text-white bg-[#f7c800] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
        onClick={handleEditUser}
      />
      <Button
        label={t('main.delete')}
        type="button"
        className="block text-white bg-[#ca1120] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
        onClick={handleDeleteUser}
      />
    </div>
  );
};

export default ActionButton;
