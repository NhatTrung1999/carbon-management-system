import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addUser, updateUser } from '../../../features/userSlice';
import Input from '../../common/Input';
import Select from '../../common/Select';
import Button from '../../common/Button';
import type { Item } from '../../../types/users';

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  mode: string;
  isOpen: boolean;
  item?: Item | null;
  setIsOpen: (value: boolean) => void;
};

// ─── Validation ───────────────────────────────────────────────────────────────

const schema = Yup.object({
  userid: Yup.string().required('Please do not leave it blank!'),
  name: Yup.string().required('Please do not leave it blank!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please do not leave it blank!'),
  role: Yup.string().required('Please do not leave it blank!'),
  status: Yup.string().required('Please do not leave it blank!'),
});

// ─── FieldError ───────────────────────────────────────────────────────────────

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
      <svg
        viewBox="0 0 10 10"
        fill="currentColor"
        className="h-2.5 w-2.5 shrink-0"
        aria-hidden="true"
      >
        <path d="M5 0a5 5 0 1 0 0 10A5 5 0 0 0 5 0zm0 7.5a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25zM4.375 3.75a.625.625 0 0 1 1.25 0v2a.625.625 0 0 1-1.25 0v-2z" />
      </svg>
      {msg}
    </p>
  ) : null;

// ─── Component ───────────────────────────────────────────────────────────────

const ModalUser = ({ mode, isOpen, item, setIsOpen }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isAdd = mode === 'add';

  const formik = useFormik({
    initialValues: {
      id: item?.ID ?? '',
      userid: item?.UserID ?? '',
      name: item?.Name ?? '',
      email: item?.Email ?? '',
      role: item?.Role ?? '',
      status: item?.Status ?? '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async ({ id, userid, email, name, role, status }) => {
      if (isAdd) {
        dispatch(
          addUser({
            id: uuidv4(),
            userid,
            email,
            name,
            role,
            status,
            createdAt: user?.UserID ?? '',
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
            updatedAt: user?.UserID ?? '',
          })
        );
      }
      setIsOpen(false);
    },
  });

  // Reset form when opening in add mode
  useEffect(() => {
    if (isOpen && isAdd) {
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

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl
        border border-white/[0.14] bg-[#636e61]/90
        shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-[48px]"
      >
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {/* ── Header ── */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
            <h2 className="text-base font-semibold text-white">
              {isAdd ? 'Add User' : 'Edit User'}
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg
                text-white/40 transition-colors duration-150
                hover:bg-white/[0.08] hover:text-white"
            >
              <IoClose size={18} />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2">
            {/* Hidden id */}
            <input type="hidden" name="id" value={formik.values.id} />

            {/* UserID */}
            <div>
              <Input
                name="userid"
                type="text"
                label="UserID"
                placeholder="Enter UserID..."
                value={formik.values.userid}
                onChange={formik.handleChange}
                disabled={!isAdd}
              />
              <FieldError
                msg={formik.touched.userid ? formik.errors.userid : undefined}
              />
            </div>

            {/* Name */}
            <div>
              <Input
                name="name"
                type="text"
                label="Name"
                placeholder="Enter name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <FieldError
                msg={formik.touched.name ? formik.errors.name : undefined}
              />
            </div>

            {/* Email — full width */}
            <div className="sm:col-span-2">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email..."
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <FieldError
                msg={formik.touched.email ? formik.errors.email : undefined}
              />
            </div>

            {/* Role */}
            <div>
              <Select
                label="Role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                options={[
                  { name: 'Choose option', value: '' },
                  { name: 'Admin', value: 'Admin' },
                  { name: 'User', value: 'User' },
                ]}
              />
              <FieldError
                msg={formik.touched.role ? formik.errors.role : undefined}
              />
            </div>

            {/* Status */}
            <div>
              <Select
                label="Status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                options={[
                  { name: 'Choose option', value: '' },
                  { name: 'Active', value: 'Active' },
                  { name: 'Inactive', value: 'Inactive' },
                ]}
              />
              <FieldError
                msg={formik.touched.status ? formik.errors.status : undefined}
              />
            </div>
          </div>

          {/* ── Footer ── */}
          <div
            className="flex items-center justify-end gap-2
            border-t border-white/[0.08] px-5 py-4"
          >
            <Button
              label="Cancel"
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            />
            <Button label="Save" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
