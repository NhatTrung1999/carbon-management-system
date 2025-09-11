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
import { addUser } from '../../../features/userSlice';

const validationSchema = Yup.object().shape({
  userid: Yup.string().required('Please do not leave it blank!'),
  name: Yup.string().required('Please do not leave it blank!'),
  email: Yup.string().required('Please do not leave it blank!'),
  role: Yup.string().required('Please do not leave it blank!'),
  status: Yup.string().required('Please do not leave it blank!'),
});

const ModalUser = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      userid: '',
      name: '',
      email: '',
      role: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (data) => {
      const { userid, email, name, role, status } = data;
      dispatch(
        addUser({
          id: uuidv4(),
          userid,
          email,
          name,
          role,
          status,
          createdAt: user?.UserID,
        })
      );
    },
  });

  return (
    <Modal>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>Add User</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                name="userid"
                type="text"
                label="UserID"
                placeholder="Please enter your userid..."
                value={formik.values.userid}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs">
                {formik.errors.userid && formik.touched.userid
                  ? formik.errors.userid
                  : null}
              </div>
            </div>
            <div>
              <Input
                name="name"
                type="text"
                label="Name"
                placeholder="Please enter your name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs">
                {formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null}
              </div>
            </div>
            <div>
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Please enter your email..."
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="text-red-600 text-xs">
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
              <div className="text-red-600 text-xs">
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
              <div className="text-red-600 text-xs">
                {formik.errors.status && formik.touched.status
                  ? formik.errors.status
                  : null}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </form>
    </Modal>
  );
};

export default ModalUser;
