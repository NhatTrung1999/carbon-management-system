import { GrLanguage } from 'react-icons/gr';
import { FaUser, FaLock } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading';

import { LANGUAGES } from '../utils/constanst';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/authSlice';

const validationSchema = Yup.object().shape({
  userid: Yup.string().required('Please do not leave it blank!'),
  password: Yup.string().required('Please do not leave it blank!'),
});

const Login = () => {
  const navigate = useNavigate();
  const elementRef = useRef(null) as any;
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      userid: '',
      password: '',
      language: 'Vietnamese',
    },
    validationSchema,
    onSubmit: async (data) => {
      const { userid, password } = data;
      await dispatch(login({ userid, password }));
      // navigate("/");
    },
  });

  useEffect(() => {
    const calculateDistanceFromTop = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect() as any;
        setDistanceFromTop(rect.top);
      }
    };

    calculateDistanceFromTop();
    window.addEventListener('resize', calculateDistanceFromTop);

    return () => {
      window.removeEventListener('resize', calculateDistanceFromTop);
    };
  }, [loading]);

  //Loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  //Loading

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-[url('https://wallpapercave.com/wp/wp12404757.jpg')] bg-center bg-cover flex">
        <div className="flex-1 bg-gray/50 backdrop-blur-xl flex-col pl-14 pr-4 py-30 justify-between hidden lg:flex">
          <div>
            <div className="xl:max-w-3xl text-[6vw] font-extrabold text-transparent bg-[url('https://wallpapercave.com/wp/wp12404757.jpg')] bg-clip-text bg-center">
              Carbon
            </div>
            <div
              ref={elementRef}
              className="pl-24 md:pl-16 text-[4vw] font-extrabold text-transparent bg-[url('https://wallpapercave.com/wp/wp12404757.jpg')] bg-clip-text bg-center"
            >
              Management
            </div>
          </div>
          <div className="text-[13px] text-[#e7e7e7] font-extrabold">
            <div>Carbon Management System (CMS)</div>
            <span>
              An internal, centralized platform that automatically aggregates
              emissions inventory data from LY App, BPM, WMS, and ERP—enabling
              seamless integration with our external Carbon Management System
              (CMS)
            </span>
          </div>
        </div>
        <div className="relative flex-2 flex px-5">
          <div
            className="text-white text-[4vw] font-extrabold hidden lg:block"
            style={{ marginTop: `${distanceFromTop}px` }}
          >
            Website
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray/50 backdrop-blur-xl shadow-lg p-6 min-w-md border border-white/20 rounded-lg">
            <h2 className="text-center text-3xl text-white font-bold tracking-tight">
              Welcome Back
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-5 mt-10 text-white"
            >
              <div>
                <label htmlFor="" className="block text-base font-medium">
                  UserId
                </label>
                <div className="mt-2">
                  <div className="flex items-center gap-3 bg-white/5 rounded-md outline-1 -outline-offset-1 outline-white/10 border border-white/20">
                    <input
                      type="text"
                      name="userid"
                      className="block w-full px-3 py-1.5 text-base outline-none"
                      value={formik.values.userid}
                      onChange={formik.handleChange}
                      autoComplete="off"
                    />
                    <div className="p-2 border-l border-white/20">
                      <FaUser size={18} className="text-white/60" />
                    </div>
                  </div>
                  <div className="text-red-600 text-xs">
                    {formik.errors.userid && formik.touched.userid
                      ? formik.errors.userid
                      : null}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="" className="block text-base font-medium ">
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex items-center gap-3 bg-white/5 rounded-md outline-1 -outline-offset-1 outline-white/10 border border-white/20">
                    <input
                      type="password"
                      name="password"
                      className="block w-full px-3 py-1.5 text-base outline-none"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      autoComplete="off"
                    />
                    <div className="p-2 border-l border-white/20">
                      <FaLock size={18} className="text-white/60" />
                    </div>
                  </div>
                  <div className="text-red-600 text-xs">
                    {formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : null}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="" className="block text-base font-medium ">
                  Language
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="size-9 border border-white/20 rounded-lg flex justify-center items-center p-1">
                    <GrLanguage size={26} color="white" />
                  </div>
                  <select
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    name="language"
                    className="block w-full border border-white/20 rounded-md bg-black/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 login-language"
                  >
                    {LANGUAGES.map((itemLanguages, indexLanguages) => (
                      <option value={itemLanguages.value} key={indexLanguages}>
                        {itemLanguages.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#FF9119] px-3 py-1.5 text-lg font-semibold text-white hover:bg-[#f67804] cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
