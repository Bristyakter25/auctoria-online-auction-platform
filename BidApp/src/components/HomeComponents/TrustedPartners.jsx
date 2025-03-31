import React from 'react';

const partners = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
];

const TrustedPartners = () => {
    return (
        <section className="py-12 bg-gray-100 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Trusted Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {partners.map((partner, index) => (
                        <div key={index} className="p-4 bg-white shadow-lg rounded-xl flex items-center justify-center">
                            <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedPartners;
