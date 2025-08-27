import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0 bg-[#081c1b] ">
      <Player
        autoplay
        loop
        src={LoadingAnimation}
        style={{ width: "400px" }}
        className="h-min"
      />
    </div>
  );
};

export default Loading;
