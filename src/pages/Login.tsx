import { GrLanguage } from 'react-icons/gr';

const Login = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-[url('../assets/images/background.jpg')] bg-center bg-cover flex">
        <div className="flex-1 bg-gray/40 backdrop-blur-lg flex justify-center items-center">
          <div className="max-w-3xl text-[8vw] font-extrabold text-transparent bg-[url('../assets/images/background.jpg')] bg-clip-text bg-center">
            Carbon Management System
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray/50 backdrop-blur-xl shadow-lg p-6 min-w-md border border-white/20 rounded-lg">
            <h2 className="text-center text-3xl text-white font-bold tracking-tight">
              Welcome Back
            </h2>
            <div className="space-y-5 mt-10 text-white">
              <div>
                <label htmlFor="" className="block text-base font-medium">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block w-full border border-white/20 rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="block text-base font-medium ">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    className="block w-full border border-white/20 rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                  />
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
                  <select className="block w-full border border-white/20 rounded-md bg-black/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 login-language">
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="English">English</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-green-600/60 px-3 py-1.5 text-lg font-semibold text-white hover:bg-green-600 cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
