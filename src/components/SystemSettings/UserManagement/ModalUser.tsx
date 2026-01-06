import Modal from '../../common/Modal/Modal';
import ModalHeader from '../../common/Modal/ModalHeader';
import ModalBody from '../../common/Modal/ModalBody';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ModalFooter from '../../common/Modal/ModalFooter';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { v4 as uuidv4 } from 'uuid';
import { addUser, updateUser } from '../../../features/userSlice';
import type { Item } from '../../../types/users';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  userid: Yup.string().required('Please do not leave it blank!'),
  name: Yup.string().required('Please do not leave it blank!'),
  email: Yup.string().required('Please do not leave it blank!'),
  role: Yup.string().required('Please do not leave it blank!'),
  status: Yup.string().required('Please do not leave it blank!'),
});

const ModalUser = ({
  mode,
  isOpen,
  item,
  setIsOpen,
}: {
  mode: string;
  isOpen: boolean;
  item: Item | null | undefined;
  setIsOpen: (value: boolean) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  const formik = useFormik({
    initialValues: {
      id: item?.ID || '',
      userid: item?.UserID || '',
      name: item?.Name || '',
      email: item?.Email || '',
      role: item?.Role || '',
      status: item?.Status || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (data) => {
      const { userid, email, name, role, status, id } = data;
      if (mode === 'add') {
        dispatch(
          addUser({
            id: uuidv4(),
            userid,
            email,
            name,
            role,
            status,
            createdAt: user?.UserID || '',
          })
        );
      } else {
        dispatch(
          updateUser({
            id,
            userid,
            email,
            name,
            role,
            status,
            updatedAt: user?.UserID || '',
          })
        );
      }
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (isOpen && mode === 'add') {
      formik.resetForm({
        values: {
          id: '',
          userid: '',
          name: '',
          email: '',
          role: '',
          status: '',
        },
      });
    }
  }, [isOpen, mode]);

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
        <ModalHeader setOpenModal={() => setIsOpen(false)}>
          <span className="text-base sm:text-lg md:text-xl">
            {mode === 'add' ? 'Add User' : 'Edit User'}
          </span>
        </ModalHeader>
        
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              name="id"
              type="hidden"
              placeholder="Please enter your userid..."
              value={formik.values.id}
            />
            
            <div className="md:col-span-2 lg:col-span-1">
              <Input
                name="userid"
                type="text"
                label="UserID"
                placeholder="Please enter your userid..."
                value={formik.values.userid}
                onChange={formik.handleChange}
                disabled={mode === 'edit'}
              />
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.userid && formik.touched.userid
                  ? formik.errors.userid
                  : null}
              </div>
            </div>
            
            <div className="md:col-span-2 lg:col-span-1">
              <Input
                name="name"
                type="text"
                label="Name"
                placeholder="Please enter your name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Please enter your email..."
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null}
              </div>
            </div>
            
            <div>
              <Select
                label="Role"
                name="role"
                options={[
                  { name: 'Choose option', value: '' },
                  { name: 'Admin', value: 'Admin' },
                  { name: 'User', value: 'User' },
                ]}
                value={formik.values.role}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.role && formik.touched.role
                  ? formik.errors.role
                  : null}
              </div>
            </div>
            
            <div>
              <Select
                label="Status"
                name="status"
                options={[
                  { name: 'Choose option', value: '' },
                  { name: 'Active', value: 'Active' },
                  { name: 'Inactive', value: 'Inactive' },
                ]}
                value={formik.values.status}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.status && formik.touched.status
                  ? formik.errors.status
                  : null}
              </div>
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter setOpenModal={() => setIsOpen(false)} />
      </form>
    </Modal>
  );
};

export default ModalUser;