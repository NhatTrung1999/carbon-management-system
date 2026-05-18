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
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        label={t('main.add')}
        type="button"
        variant="primary"
        onClick={handleAddUser}
      />
      <Button
        label={t('main.edit')}
        type="button"
        variant="secondary"
        onClick={handleEditUser}
      />
      <Button
        label={t('main.delete')}
        type="button"
        variant="danger"
        onClick={handleDeleteUser}
      />
    </div>
  );
};

export default ActionButton;
