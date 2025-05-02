

import ContactForm from "./ContactForm";

const ContactWithMap = () => {
  return (
    <div>
      <div className="overflow-hidden rounded-lg lg:col-span-2 w-9/12 mx-auto h-96">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title="map"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Bangladesh&ie=UTF8&t=&z=7&iwloc=B&output=embed"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactWithMap;

