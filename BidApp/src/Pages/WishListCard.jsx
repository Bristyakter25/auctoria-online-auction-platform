import { useNavigate } from "react-router-dom";

const WishListCard = ({ wishListProduct }) => {
  const navigate = useNavigate();
  const { _id, productName, productImage, startingBid, description } =
    wishListProduct;
  return (
    <div>
      <div className="card dark:bg-transparent card-compact bg-base-100 lg:w-[390px] shadow-xl" onClick={() => navigate(`/bid/${_id}`)}>
        <figure>
          <img src={productImage} className="w-full h-[250px]" alt="Shoes" />
        </figure>
        <div className="card-body  dark:text-white">
          <h2 className="text-2xl font-bold h-[70px]">{productName}</h2>
          <p className="h-[100px]">{description}</p>
          <p>
            Starting Bid:{" "}
            <span className="text-2xl font-bold"> {startingBid}</span>
          </p>
          <div className="card-actions justify-end">
            <button className="btn " onClick={() => navigate(`/bid/${_id}`)}>
              Bid Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
