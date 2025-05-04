import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
const BidInstruction = () => {
  return (
    <div className="min-h-screen">
      <div className="text-center py-40 bg-gradient-to-r from-yellow-100 via-white to-yellow-100">
        <h2 className="text-5xl  font-bold mb-5">How To Bid</h2>

        <div className="flex items-center justify-center gap-x-3 text-center ">
          <Link to="/" className="text-lg hover:text-green-600">
            Home
          </Link>
          <p className="mt-2 ">
            {" "}
            <FaLongArrowAltRight />
          </p>
          <p className="text-lg ">Bid Instruction</p>
        </div>
      </div>
      <div className="flex w-[350px] my-10 lg:w-[1000px] mx-auto gap-x-10">
        <div>
          <button className="px-4 rounded-xl py-2 bg-gray-600  hover:bg-blue-500 text-white ">
            Step-01
          </button>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 my-4">
            Registration
          </h2>
          <p className="dark:text-white text-gray-600 font-medium text-sm mb-72">
            Clearly state your pricing structure, payment terms and and any
            additional charges. Specifying when & payment invoices will be
            issued, as well as your accepted.
          </p>

          <button className="px-4 rounded-xl py-2 bg-gray-600 hover:bg-blue-500 text-white ">
            Step-03
          </button>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 my-4">
            Place Bids
          </h2>
          <p className="dark:text-white text-gray-600 font-medium text-sm mb-72">
            Clearly state your pricing structure, payment terms and and any
            additional charges. Specifying when & payment invoices will be
            issued, as well as your accepted.
          </p>

          <button className="px-4 rounded-xl py-2 bg-gray-600  hover:bg-blue-500 text-white ">
            Step-05
          </button>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 my-4">
            Payment and Shipping
          </h2>
          <p className="dark:text-white text-gray-600 font-medium text-sm mb-72">
            Clearly state your pricing structure, payment terms and and any
            additional charges. Specifying when & payment invoices will be
            issued, as well as your accepted.
          </p>
        </div>

        <div>
          <div className="relative h-[320px]">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-[280px] border-l-2 border-gray-400 transform -translate-x-1/2"></div>

            {/* Arrow Below the Line */}
            <div className="absolute left-1/2 top-[280px] transform -translate-x-1/2">
              <FaArrowTrendDown className="text-gray-600 text-xl" />
            </div>
          </div>
          <div className="relative h-[320px]">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-[280px] border-l-2 border-gray-400 transform -translate-x-1/2"></div>

            {/* Arrow Below the Line */}
            <div className="absolute left-1/2 top-[280px] transform -translate-x-1/2">
              <FaArrowTrendDown className="text-gray-600 text-xl" />
            </div>
          </div>
          <div className="relative h-[320px]">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-[280px] border-l-2 border-gray-400 transform -translate-x-1/2"></div>

            {/* Arrow Below the Line */}
            <div className="absolute left-1/2 top-[280px] transform -translate-x-1/2">
              <FaArrowTrendDown className="text-gray-600 text-xl" />
            </div>
          </div>
          <div className="relative h-[320px]">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 h-[280px] border-l-2 border-gray-400 transform -translate-x-1/2"></div>

            {/* Arrow Below the Line */}
            <div className="absolute left-1/2 top-[280px] transform -translate-x-1/2">
              <FaArrowTrendDown className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>

        <div className=" mt-52">
          <button className="px-4 rounded-xl py-2 bg-gray-600  hover:bg-blue-500 text-white ">
            Step-02
          </button>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 my-4">
            Browse Listings
          </h2>
          <p className="dark:text-white text-gray-600 font-medium text-sm mb-72">
            Clearly state your pricing structure, payment terms and and any
            additional charges. Specifying when & payment invoices will be
            issued, as well as your accepted.
          </p>
          <button className="px-4 rounded-xl py-2 bg-gray-600  hover:bg-blue-500 text-white ">
            Step-04
          </button>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 my-4">
            Winning the Auction
          </h2>
          <p className="dark:text-white text-gray-600 font-medium text-sm mb-32">
            Clearly state your pricing structure, payment terms and and any
            additional charges. Specifying when & payment invoices will be
            issued, as well as your accepted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BidInstruction;
