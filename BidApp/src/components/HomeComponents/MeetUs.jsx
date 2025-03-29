import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "John Doe",
    position: "CEO & Founder",
    image: "https://i.ibb.co.com/RpcZPTbq/pexels-edmond-dante-s-4347366.webp",
    socials: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Jane Smith",
    position: "Lead Developer",
    image: "https://i.ibb.co.com/fQNC8rg/team1.jpg",
    socials: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Alice Johnson",
    position: "UI/UX Designer",
    image: "https://i.ibb.co.com/bM8LpTq8/image4.webp",
    socials: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

const MeetUs = () => {
  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl p-6">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200"
            />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">{member.name}</h3>
            <p className="text-gray-500">{member.position}</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href={member.socials.facebook} className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={20} />
              </a>
              <a href={member.socials.linkedin} className="text-blue-500 hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
              <a href={member.socials.twitter} className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetUs;

