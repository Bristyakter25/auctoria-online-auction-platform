import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 mt-20 mb-20 md:grid-cols-3 gap-8 p-8">
      {/* Location */}
      <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
        <div className="bg-green-100 p-4 rounded-full">
          <FaMapMarkerAlt className="text-green-500 text-2xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>
          <p className="text-gray-600">
            168/170, Ave 01, Old York Drive Rich<br />
            Mirpur, Dhaka
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
        <div className="bg-green-100 p-4 rounded-full">
          <FaPhoneAlt className="text-green-500 text-2xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Phone</h2>
          <p className="text-gray-600">
            +0213549826649<br />
            +8801910628025
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
        <div className="bg-green-100 p-4 rounded-full">
          <FaEnvelope className="text-green-500 text-2xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email</h2>
          <p className="text-gray-600">
          sabihaakterbristy@gmail.com<br />
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
