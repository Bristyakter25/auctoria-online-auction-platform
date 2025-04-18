const Question = () => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-center text-5xl pt-10 pb-5">
          {" "}
          Frequently Asked Questions
        </h2>
      </div>
      <div className="w-full md:w-3/5 mx-auto space-y-5">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            {/* How does the bidding process work? */}
            How does the bidding process work?
          </div>
          <div className="collapse-content">
            
            <p>
              Bidding is simple! Just place your bid and watch the excitement
              unfold!
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I sell my items here?
          </div>
          <div className="collapse-content">
            <p>Absolutely! List your items and let the bidding wars begin!</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Is there a fee to join?
          </div>
          <div className="collapse-content">
            <p>Nope! Joining is free, but bidding may cost you!</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I bid from my phone?
          </div>
          <div className="collapse-content">
            <p>Of course! Our platform is mobile-friendly!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
