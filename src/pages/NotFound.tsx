import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="bg-amber-300 min-h-screen bg-[url(../assets/images/not-found.jpg)] bg-cover bg-center relative">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-18 text-white">
          <h1 className="text-[200px] font-bold">Oops</h1>
          <div className="text-3xl font-semibold">
            The page you were looking for doesn't exist.
          </div>
          <Link to={'/'}>
            <div className="px-10 py-5 rounded-2xl w-[180px] bg-gray/50 backdrop-blur-2xl font-bold text-lg text-center border border-white/20">
              Go back
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
