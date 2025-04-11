const FeaturedProductCard = ({ auction }) => {
  const { productName, productImage, description, status, startingBid } =
    auction;
  return (
    <div className="card card-compact bg-base-100 shadow-xl mx-4">
      <figure>
        <img src={productImage} className="h-[200px] w-full" alt="product" />
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-2xl text-black">{productName}</h2>
        <p>{description}</p>
        <p>
          Starting Bid:{" "}
          <span className="font-bold text-2xl text-black"> ${startingBid}</span>
        </p>
        <p>Status: {status}</p>
        <div className="card-actions justify-end">
          <button className="btn">Bid Now!</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
