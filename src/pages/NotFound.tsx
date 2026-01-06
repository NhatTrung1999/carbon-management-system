import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="bg-amber-300 min-h-screen bg-[url(../assets/images/not-found.jpg)] bg-cover bg-center relative">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/50 flex justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center space-y-8 sm:space-y-12 md:space-y-18 text-white text-center">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[200px] font-bold leading-none">
            Oops
          </h1>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold px-4 max-w-2xl">
            The page you were looking for doesn't exist.
          </div>
          <Link to={'/'}>
            <div className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl min-w-[160px] sm:w-[180px] bg-gray/50 backdrop-blur-2xl font-bold text-base sm:text-lg text-center border border-white/20 hover:bg-gray/70 transition-all duration-300 cursor-pointer">
              Go back
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;