

const WishListCard = ({wishListProduct}) => {
    const {productName, productImage, startingBid, description} = wishListProduct;
    return (
        <div>
         <div className="card card-compact bg-base-100 w-[320px] shadow-xl">
  <figure>
    <img
      src={productImage}
      className="w-full h-[200px]"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="text-2xl font-bold">{productName}</h2>
    <p>{description}</p>
    <p>Starting Bid: <span className="text-2xl font-bold"> {startingBid}</span></p>
    <div className="card-actions justify-end">
      <button className="btn ">Bid Now!</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default WishListCard;