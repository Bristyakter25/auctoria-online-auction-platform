// import { ScaleLoader } from "react-spinners";
import { Player } from "@lottiefiles/react-lottie-player";
import animationLoading from "../../../assets/Animation Loading.json";
import { FaGavel } from "react-icons/fa";
const LoadingSpinner = () => {
  return (
    // <div
    //   className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
    //   flex
    //   flex-col
    //   justify-center
    //   items-center `}
    // >
    //   <ScaleLoader size={100} color="lime" />
    // </div>
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-[130px] h-[130px]">
        <Player
          autoplay
          loop
          src={animationLoading}
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <FaGavel className="text-4xl animate-bounce opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
