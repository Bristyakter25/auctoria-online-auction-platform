import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I place a bid in an auction?',
    answer:
      'To place a bid, simply log in to your account, go to the auction page, and enter your bid amount. Then, click on the "Place Bid" button.',
  },
  {
    question: 'Can I cancel a bid after placing it?',
    answer:
      'No, once a bid is placed, it cannot be cancelled. Please make sure before confirming your bid.',
  },
  {
    question: 'Is there a fee to join an auction?',
    answer:
      'Some auctions require a joining fee which will be mentioned on the auction page. Many auctions are free to join.',
  },
  {
    question: 'How will I know if I’ve won an auction?',
    answer:
      'If you’re the highest bidder when the auction ends, you’ll receive a notification via email and in your dashboard.',
  },
  {
    question: 'What happens if I win but don’t pay?',
    answer:
      'Failure to pay within the specified time may result in your account being suspended or permanently banned.',
  },
];

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-white lg:w-[1188px] mt-24 w-[350px] mx-auto dark:bg-transparent">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="lg:text-4xl text-3xl  dark:text-[#4D55CC]  font-bold text-center mb-4">
       Frequently Asked Questions
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800"
            >
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleAnswer(index)}
              >
                <h1 className="font-semibold text-gray-700 dark:text-white">
                  {faq.question}
                </h1>

                <span
                  className={`rounded-full p-1 ${
                    openIndex === index
                      ? 'text-gray-400 bg-gray-200'
                      : 'text-white bg-blue-500'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {openIndex === index ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    )}
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
