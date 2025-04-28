import React, { useState } from "react";

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is an auction?",
      answer: "An auction is a public sale where goods or services are sold to the highest bidder. Participants compete by placing increasingly higher bids until no higher bids are offered, and the item is sold to the last remaining bidder."
    },
    {
      question: "How do auctions work?",
      answer: "Auctions typically follow these steps: 1) Items are displayed for preview, 2) Bidding starts at a set price, 3) Participants place increasing bids, 4) The auctioneer declares the item sold when no higher bids are received, and 5) The highest bidder completes payment and collects the item."
    },
    {
      question: "Who can participate in auctions?",
      answer: "Most auctions are open to the general public. Some specialized auctions may require registration or proof of funds. Online auctions typically require creating an account. Certain auctions may have age restrictions or other requirements depending on the items being sold."
    },
    {
      question: "What types of auctions are there?",
      answer: "Common auction types include: English auctions (ascending bids), Dutch auctions (descending price), sealed-bid auctions, silent auctions, and online auctions. There are also specialized auctions for art, real estate, vehicles, and collectibles."
    },
    {
      question: "What happens if I win an auction?",
      answer: "When you win an auction: 1) You'll receive notification of your winning bid, 2) You'll need to complete payment within the specified timeframe, 3) You'll arrange for item collection or delivery, and 4) You may need to provide identification for high-value items. Failure to pay may result in penalties."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold   text-center">Frequently Asked Questions</h1>
      <h1 className=" mb-20 text-center">Feel free adapt this based on the specific managed services, features</h1>
      <div className="lg:flex gap-10 items-start">
        {/* FAQ Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxh8yhtbP-iM-9Jk0Ybx_QavYVZTZr1pFrag&s"
            alt="Auction FAQ"
            className="rounded-lg shadow-md w-full h-96 object-cover"
          />
        </div>
        
        {/* FAQ List */}
        <div className="w-full lg:w-1/2 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-blue-600 focus:outline-none py-2"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeIndex === index && (
                <div 
                  id={`faq-answer-${index}`}
                  className="mt-2 text-gray-600 pl-2 animate-fadeIn"
                >
                  {faq.answer.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;