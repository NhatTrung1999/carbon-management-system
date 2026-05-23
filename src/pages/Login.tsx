import { GrLanguage } from 'react-icons/gr';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading';

import { LANGUAGES } from '../utils/constanst';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/authSlice';

// import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import backgroundLogin from '../assets/images/background-login.jpg';
import { Toast } from '../utils/Toast';

const validationSchema = Yup.object().shape({
  userid: Yup.string().required('Please do not leave it blank!'),

  password: Yup.string().required('Please do not leave it blank!'),
});

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const savedLang = localStorage.getItem('lang') || 'en';

  const formik = useFormik({
    initialValues: {
      userid: '',
      password: '',
      language: savedLang,
    },

    validationSchema,

    onSubmit: async (data) => {
      const { userid, password } = data;

      const result = await dispatch(
        login({
          userid,
          password,
        })
      );

      if (login.fulfilled.match(result)) {
        navigate('/');
      } else {
        Toast.fire({
          icon: 'error',
          title: result.payload as string,
        });
      }
    },
  });

  useEffect(() => {
    i18n.changeLanguage(savedLang);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110c]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* IMAGE */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[3px] opacity-[0.65]"
          style={{
            backgroundImage: `url(${backgroundLogin})`,
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07110c]/20 via-[#0f172a]/15 to-[#07110c]/25" />

        {/* GLOW */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-green-400/10 blur-3xl" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '42px 42px',
          }}
        />
      </div>

      {/* MAIN */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* LEFT */}
        <div className="hidden flex-1 flex-col justify-between px-16 py-20 lg:flex">
          <div>
            <div className="text-[6vw] font-black leading-none tracking-tight text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
              Carbon
            </div>

            <div className="pl-28 text-[4vw] font-black leading-none tracking-tight text-emerald-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
              Management
            </div>

            <div className="pl-56 text-[2.5vw] font-black leading-none tracking-tight text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Website
            </div>
          </div>

          <div className="max-w-[520px]">
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
              Carbon Management Website
            </div>

            <p className="text-sm leading-8 text-slate-100">
              An internal centralized platform that automatically aggregates
              emissions inventory data from LY App, BPM, WMS, and ERP — enabling
              seamless integration with our external Carbon Management System
              (CMS).
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex w-full items-center justify-center px-6 py-10 lg:max-w-[540px]">
          {/* GLASS CARD */}
          <div className="relative w-full max-w-md overflow-hidden rounded-[34px] border border-white/[0.18] bg-white/[0.04] p-8 shadow-[0_10px_80px_rgba(0,0,0,0.35)] backdrop-blur-[40px]">
            {/* GLASS REFLECTION */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-br from-white/[0.28] via-white/[0.03] to-transparent" />

            {/* BORDER GLOW */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] border border-white/[0.10]" />

            {/* CONTENT */}
            <div className="relative z-10">
              {/* HEADER */}
              <div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                  {t('main.welcome_back')}
                </h2>

                <p className="mt-2 text-center text-sm text-slate-100">
                  Please sign in to continue
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={formik.handleSubmit} className="mt-10 space-y-5">
                {/* USER ID */}
                <div>
                  <label className="block text-sm font-medium text-slate-100">
                    {t('main.user_id')}
                  </label>

                  <div className="mt-2 flex items-center overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.03] backdrop-blur-2xl transition-all duration-300 focus-within:border-emerald-400/40 focus-within:bg-white/[0.05] focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="text"
                      name="userid"
                      className="block w-full bg-transparent px-4 py-3 sm:px-5 text-sm text-white outline-none placeholder:text-slate-300"
                      value={formik.values.userid}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      placeholder="Enter your user id"
                    />

                    <div className="px-5 text-slate-200">
                      <FaUser />
                    </div>
                  </div>

                  <div className="mt-1 text-xs text-red-200">
                    {formik.errors.userid && formik.touched.userid
                      ? formik.errors.userid
                      : null}
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-slate-100">
                    {t('main.password')}
                  </label>

                  <div className="mt-2 flex items-center overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.03] backdrop-blur-2xl transition-all duration-300 focus-within:border-emerald-400/40 focus-within:bg-white/[0.05] focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="password"
                      name="password"
                      className="block w-full bg-transparent px-4 py-3 sm:px-5 text-sm text-white outline-none placeholder:text-slate-300"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      autoComplete="off"
                      placeholder="Enter your password"
                    />

                    <div className="px-5 text-slate-200">
                      <FaLock />
                    </div>
                  </div>

                  <div className="mt-1 text-xs text-red-200">
                    {formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : null}
                  </div>
                </div>

                {/* LANGUAGE */}
                <div>
                  <label className="block text-sm font-medium text-slate-100">
                    {t('main.language')}
                  </label>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.03] text-slate-100 backdrop-blur-2xl">
                      <GrLanguage size={20} />
                    </div>

                    <select
                      value={formik.values.language}
                      onChange={(e) => {
                        const lang = e.target.value;

                        formik.setFieldValue('language', lang);

                        i18n.changeLanguage(lang);

                        localStorage.setItem('lang', lang);
                      }}
                      name="language"
                      className="h-12 w-full rounded-2xl border border-white/[0.10] bg-white/[0.03] px-5 text-sm text-white outline-none backdrop-blur-2xl transition-all duration-300 focus:border-emerald-400/40 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
                    >
                      {LANGUAGES.map((itemLanguages, indexLanguages) => (
                        <option
                          value={itemLanguages.value}
                          key={indexLanguages}
                          className="bg-[#0f172a]"
                        >
                          {itemLanguages.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-500/70 text-base font-semibold text-white shadow-[0_8px_30px_rgba(16,185,129,0.28)] backdrop-blur-2xl transition-all duration-300 hover:bg-emerald-400/80 hover:shadow-[0_10px_40px_rgba(16,185,129,0.40)] active:scale-[0.98]"
                  >
                    {t('main.login')}

                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </form>

              {/* FOOTER */}
              <div className="mt-8 border-t border-white/[0.08] pt-6 text-center text-xs text-slate-200">
                Carbon Management Website © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
