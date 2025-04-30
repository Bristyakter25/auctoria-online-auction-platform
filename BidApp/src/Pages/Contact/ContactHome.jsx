import React from 'react';
import ContactWithMap from '../../components/HomeComponents/ContactWithMap';
import ContactBanner from './ContactBanner';
import ContactInfo from './ContactInfo';
import ContactForm from '../../components/HomeComponents/ContactForm';

const ContactHome = () => {
    return (
        <div>
            <ContactBanner></ContactBanner>
            <ContactInfo></ContactInfo>
            <ContactForm></ContactForm>
            <ContactWithMap></ContactWithMap>
        </div>
    );
};

export default ContactHome;